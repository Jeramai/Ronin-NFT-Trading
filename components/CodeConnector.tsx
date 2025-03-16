'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useMainStore from '@/hooks/use-store';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { proposeTrade } from '@/lib/web3provider';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ArrowRight, Copy, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import FirebaseHandler from './firebase/InitHandler';
import { Spinner } from './ui/spinner';

export default function CodeConnector() {
  const { user } = useMainStore();
  const { toast } = useToast();

  const [myCode, setMyCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedTo, setConnectedTo] = useState<string>('');
  const [aIsReady, setAIsReady] = useState(false);
  const [bIsReady, setBIsReady] = useState(false);

  const generateNewCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let isUnique = false;

    while (!isUnique) {
      // Generate a new code
      result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      // Check if the code already exists in the database
      const codeQuery = query(collection(db, 'codes'), where('code', '==', result));
      const codeSnapshot = await getDocs(codeQuery);

      // If no documents found with this code, it's unique
      if (codeSnapshot.empty) isUnique = true;
    }

    setMyCode(result);
    setIsConnected(false);
    setConnectedTo('');

    // Save the unique code to Firestore
    const userQuery = query(collection(db, 'codes'), where('userA', '==', user?.connectedAddress));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      await addDoc(collection(db, 'codes'), {
        code: result,
        userA: user?.connectedAddress,
        userB: null,
        tradeIndex: null
      });
    } else {
      const docRef = querySnapshot.docs[0].ref;
      await setDoc(
        docRef,
        {
          code: result,
          userA: user?.connectedAddress,
          userB: null,
          tradeIndex: null
        },
        { merge: false }
      );
    }
  };
  const attemptConnection = async () => {
    if (!inputCode) {
      toast({
        title: 'No code entered',
        description: 'Please enter a connection code.',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    if (inputCode === myCode) {
      toast({
        title: 'Cannot connect to yourself',
        description: "Please enter someone else's code.",
        variant: 'destructive',
        duration: 2000
      });
    } else {
      const q = query(collection(db, 'codes'), where('code', '==', inputCode), where('userB', '==', null));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          title: 'Invalid code',
          description: 'The entered code is not valid.',
          variant: 'destructive',
          duration: 2000
        });
      } else {
        // Update the document with userB
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          userB: user?.connectedAddress // Using the connected address from your user object
        });

        setIsConnected(true);
        setConnectedTo(inputCode);
      }
    }
  };
  const disconnect = async () => {
    setIsConnected(false);
    setConnectedTo('');
    setInputCode('');
    setMyCode('');
    setAIsReady(false);
    setBIsReady(false);

    // Remove the code from Firestore
    const q = query(collection(db, 'codes'), where('code', '==', myCode));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, 'codes', docSnapshot.id));
    });

    // Remove self from code
    const q2 = query(collection(db, 'codes'), where('userB', '==', user?.connectedAddress));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(async (docSnapshot) => {
      await updateDoc(doc(db, 'codes', docSnapshot.id), {
        userB: null,
        userAReady: false,
        userBReady: false
      });
    });

    generateNewCode();
  };
  const startTrading = async () => {
    const userQuery = query(collection(db, 'codes'), where('code', '==', inputCode || myCode));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return;

    const docData = querySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;

    // Check if user is userA or userB
    const isUserA = docData.userA === user?.connectedAddress;
    const isUserB = docData.userB === user?.connectedAddress;

    if (isUserA) {
      // Call the proposeTrade function on the smart contract
      try {
        setAIsReady(true);
        const tradeIndex = await proposeTrade(docData.userB);
        await updateDoc(docRef, { userAReady: true, tradeIndex: tradeIndex || 0 });
      } catch (e) {
        disconnect();

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An error occurred while proposing the trade.',
          duration: 3000
        });
        console.error(e);
      }
    } else if (isUserB) {
      setBIsReady(true);
      await updateDoc(docRef, { userBReady: true });
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(myCode);
    toast({
      title: 'Code copied!',
      description: 'Your code has been copied to clipboard.',
      duration: 2000
    });
  };

  // Generate code on init
  useEffect(() => {
    generateNewCode();
  }, []);

  const startTradingDisabled = myCode === connectedTo ? aIsReady : bIsReady;

  return (
    <>
      <Card className='shadow-lg rounded-md dark:border-slate-700 dark:bg-slate-900'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='flex justify-between items-center'>
              <span>Your Connection Code</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className='space-y-6 mb-2'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <div className='relative flex-1'>
                <Input
                  value={myCode}
                  readOnly
                  className='text-center text-lg font-mono tracking-wider bg-slate-50 dark:bg-slate-800'
                />
                <Button
                  size='icon'
                  variant='ghost'
                  className='absolute right-0 top-1/2 -translate-y-1/2'
                  onClick={copyCodeToClipboard}
                >
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
              <Button size='icon' variant='outline' onClick={generateNewCode} disabled={isConnected}>
                <RefreshCw className='h-4 w-4' />
              </Button>
            </div>
            <p className='text-xs text-slate-500 text-center'>Share this code with someone to let them connect to you</p>
          </div>

          {isConnected ? (
            <div className='bg-green-50 p-4 rounded-md border border-green-200 dark:bg-green-900/20 dark:border-green-800'>
              <h3 className='font-medium text-green-800 dark:text-green-400'>Connected to user</h3>
              <code className='text-green-700 dark:text-green-300'>{connectedTo}</code>

              <div className='flex gap-2 mt-2'>
                <Button
                  variant='outline'
                  className='w-full border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/50 dark:hover:text-green-300'
                  onClick={disconnect}
                >
                  Disconnect
                </Button>
                <Button onClick={startTrading} className='w-full' disabled={startTradingDisabled}>
                  {startTradingDisabled ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Start trading</span>
                      <ArrowRight className='h-4 w-4' />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className='border-t border-b py-4'>
              <h3 className='font-medium mb-2'>Connect to someone</h3>
              <div className='flex gap-2'>
                <Input
                  placeholder='Enter code'
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className='font-mono'
                  maxLength={6}
                />
                <Button onClick={attemptConnection}>
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className='text-xs text-slate-500 justify-center'>
          {isConnected
            ? "You're connected to another user. You can now start trading."
            : "Enter someone's code to establish a connection."}
        </CardFooter>
      </Card>

      <FirebaseHandler
        myCode={myCode}
        inputCode={inputCode}
        setIsConnected={setIsConnected}
        setConnectedTo={setConnectedTo}
        aIsReady={aIsReady}
        bIsReady={bIsReady}
        setAIsReady={setAIsReady}
        setBIsReady={setBIsReady}
      />
    </>
  );
}
