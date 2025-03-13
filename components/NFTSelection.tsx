'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useMainStore from '@/hooks/use-store';
import { db } from '@/lib/firebase';
import useUrlPrefix from '@/lib/useUrlPrefix';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Loader2, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import FirebaseHandler from './firebase/SwapHandler';
import NFTPicker from './NFTPicker';

export default function NFTSelection() {
  const { user, sessionCode, traderAddress, setTraderAddress } = useMainStore();
  const urlPrefix = useUrlPrefix();

  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [otherUserNFT, setOtherUserNFT] = useState<any>(null);

  const [showNFTPicker, setShowNFTPicker] = useState<boolean>(false);

  const [hasAgreed, setHasAgreed] = useState(false);
  const [otherHasAgreed, setOtherHasAgreed] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [otherHasConfirmed, setOtherHasConfirmed] = useState(false);

  const selectOwnNFT = async (nftData: any) => {
    // Cleanup the nft data
    const cleanNFT = {
      imageUrl: nftData.metadata?.image ?? nftData.media?.originalMediaUrl ?? '/placeholder.svg',
      name: nftData.metadata?.name ?? nftData.name ?? 'NFT',
      tokenHash: nftData.tokenHash
    };

    setSelectedNFT(cleanNFT);

    const userQuery = query(collection(db, 'codes'), where('code', '==', sessionCode));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return;

    const docData = querySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;

    // Check if user is the host or guest
    if (user?.connectedAddress === docData.userA) {
      await updateDoc(docRef, {
        userANFT: cleanNFT
      });
    } else {
      await updateDoc(docRef, {
        userBNFT: cleanNFT
      });
    }

    setHasAgreed(false);
    setOtherHasAgreed(false);
    setHasConfirmed(false);
    setOtherHasConfirmed(false);
  };
  const resetOwnNFT = async () => {
    setSelectedNFT(null);

    const userQuery = query(collection(db, 'codes'), where('code', '==', sessionCode));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return;

    const docData = querySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;

    // Check if user is the host or guest
    if (user?.connectedAddress === docData.userA) {
      await updateDoc(docRef, {
        userANFT: null,
        userAHasAgreed: false,
        userAHasConfirmed: false,
        userBHasAgreed: false,
        userBHasConfirmed: false
      });
    } else {
      await updateDoc(docRef, {
        userBNFT: null,
        userAHasAgreed: false,
        userAHasConfirmed: false,
        userBHasAgreed: false,
        userBHasConfirmed: false
      });
    }

    setSelectedNFT(null);
    setHasAgreed(false);
    setOtherHasAgreed(false);
    setHasConfirmed(false);
    setOtherHasConfirmed(false);
  };
  const agreeTrade = async () => {
    const userQuery = query(collection(db, 'codes'), where('code', '==', sessionCode));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return;

    const docData = querySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;

    // Check if user is the host or guest
    if (user?.connectedAddress === docData.userA) {
      await updateDoc(docRef, { userAHasAgreed: true });
    } else {
      await updateDoc(docRef, { userBHasAgreed: true });
    }

    setHasAgreed(true);
  };
  const confirmTrade = async () => {
    const userQuery = query(collection(db, 'codes'), where('code', '==', sessionCode));
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) return;

    const docData = querySnapshot.docs[0].data();
    const docRef = querySnapshot.docs[0].ref;

    // Check if user is the host or guest
    if (user?.connectedAddress === docData.userA) {
      await updateDoc(docRef, { userAHasConfirmed: true });
    } else {
      await updateDoc(docRef, { userBHasConfirmed: true });
    }
  };
  const abortTrade = async () => {
    // Remove the code from Firestore
    const q = query(collection(db, 'codes'), where('code', '==', sessionCode));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, 'codes', docSnapshot.id));
    });

    setSelectedNFT(null);
    setOtherUserNFT(null);
    setHasAgreed(false);
    setOtherHasAgreed(false);
    setHasConfirmed(false);
    setOtherHasConfirmed(false);
    setTraderAddress(null);
  };
  const onBothConfirm = () => {
    setSelectedNFT(null);
    setOtherUserNFT(null);
    setHasAgreed(false);
    setOtherHasAgreed(false);
    setHasConfirmed(false);
    setOtherHasConfirmed(false);
  };

  return (
    <>
      <div className='flex flex-col gap-4 w-full max-w-4xl mx-auto'>
        <div className='flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto mb-3 sm:mb-0 '>
          {/* User's NFT selection */}
          <Card className='flex flex-col p-3 w-full shadow-lg dark:border-slate-700 dark:bg-slate-900'>
            <CardHeader className='border-b mb-3 !p-0'>
              <div className='mb-2'>
                <CardTitle className='flex justify-between mb-2'>
                  <span>Your NFT</span>
                  {selectedNFT ? (
                    <button onClick={resetOwnNFT}>
                      <RotateCcw className='h-4 w-4' />
                    </button>
                  ) : null}
                </CardTitle>
                <div className='text-xs text-gray-500 truncate'>{user?.connectedAddress}</div>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center sm:aspect-square !p-0'>
              {selectedNFT ? (
                <div className='text-center'>
                  <Image
                    src={selectedNFT.imageUrl ?? `${urlPrefix}/placeholder.svg`}
                    alt={selectedNFT.name}
                    width={200}
                    height={200}
                    className='rounded-lg mb-2'
                  />
                  <p className='font-medium'>{selectedNFT.name}</p>
                </div>
              ) : (
                <button
                  className='border-4 border-dashed rounded-md w-full h-full flex flex-col items-center justify-center min-h-[100px]'
                  onClick={() => setShowNFTPicker(true)}
                >
                  <p className='text-slate-500 dark:text-slate-400'>No NFT selected</p>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Other user's NFT display */}
          <Card className='flex flex-col p-3 w-full shadow-lg dark:border-slate-700 dark:bg-slate-900'>
            <CardHeader className='border-b mb-3 !p-0'>
              <div className='mb-2'>
                <CardTitle className='mb-2'>Other User's NFT</CardTitle>
                <div className='text-xs text-gray-500'>{traderAddress}</div>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center sm:aspect-square h-full min-h-[100px] !p-0'>
              {otherUserNFT ? (
                <div className='text-center'>
                  <Image
                    src={otherUserNFT.imageUrl ?? `${urlPrefix}/placeholder.svg`}
                    alt={otherUserNFT.name}
                    width={200}
                    height={200}
                    className='rounded-lg mb-2'
                  />
                  <p className='font-medium'>{otherUserNFT.name}</p>
                </div>
              ) : (
                <p className='text-slate-500 dark:text-slate-400'>Waiting for other user...</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Confirm trade button */}
        <div className='flex justify-end'>
          {hasAgreed && !otherHasAgreed ? (
            <Button className='w-fit sm:w-full' disabled={true}>
              <Loader2 className='animate-spin' />
              <span>Waiting for other trader</span>
            </Button>
          ) : hasConfirmed && !otherHasConfirmed ? (
            <Button
              disabled={true}
              className='w-fit sm:w-full !bg-green-700 hover:!bg-green-700/80 font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Loader2 className='animate-spin' />
              <span>Waiting for other trader</span>
            </Button>
          ) : hasAgreed && otherHasAgreed ? (
            <Button
              disabled={!selectedNFT || !otherUserNFT}
              onClick={confirmTrade}
              className='w-fit sm:w-full !bg-green-700 hover:!bg-green-700/80 font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <span>Confirm Trade</span>
            </Button>
          ) : (
            <Button className='w-fit sm:w-full' disabled={!selectedNFT || !otherUserNFT} onClick={agreeTrade}>
              Agree to this Trade
            </Button>
          )}
        </div>

        <hr />
        <div className='flex justify-center'>
          <Button variant='ghost' className='w-fit sm:w-full text-gray-400 hover:text-white' onClick={abortTrade}>
            <span>Abort trade</span>
          </Button>
        </div>
      </div>

      <NFTPicker show={showNFTPicker} onHide={() => setShowNFTPicker(false)} onConfirm={selectOwnNFT} />

      <FirebaseHandler
        setOtherUserNFT={setOtherUserNFT}
        setHasAgreed={setHasAgreed}
        setOtherHasAgreed={setOtherHasAgreed}
        setHasConfirmed={setHasConfirmed}
        setOtherHasConfirmed={setOtherHasConfirmed}
        onBothConfirm={onBothConfirm}
      />
    </>
  );
}
