'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useMainStore from '@/hooks/use-store';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Copy, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CodeConnector() {
  const { setTraderAddress } = useMainStore();

  const [myCode, setMyCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedTo, setConnectedTo] = useState<string>('');

  const { toast } = useToast();

  // Generate a random code on component mount
  useEffect(() => generateNewCode(), []);

  // Function to generate a new random code
  const generateNewCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setMyCode(result);
    setIsConnected(false);
    setConnectedTo('');
  };

  // Function to copy code to clipboard
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(myCode);
    toast({
      title: 'Code copied!',
      description: 'Your code has been copied to clipboard.',
      duration: 2000
    });
  };

  // Function to handle connection attempt
  const attemptConnection = () => {
    if (!inputCode) {
      toast({
        title: 'No code entered',
        description: 'Please enter a connection code.',
        variant: 'destructive',
        duration: 2000
      });
      return;
    }

    // In a real app, this would check against a database of active codes
    // For demo purposes, we'll simulate a successful connection
    // when the input is not the same as the user's own code
    if (inputCode === myCode) {
      toast({
        title: 'Cannot connect to yourself',
        description: "Please enter someone else's code.",
        variant: 'destructive',
        duration: 2000
      });
    } else {
      setIsConnected(true);
      setConnectedTo(inputCode);
      toast({
        title: 'Connected!',
        description: `You are now connected to user with code ${inputCode}.`,
        duration: 3000
      });
    }
  };

  // Function to disconnect
  const disconnect = () => {
    setIsConnected(false);
    setConnectedTo('');
    setInputCode('');
    toast({
      title: 'Disconnected',
      description: 'You have been disconnected.',
      duration: 2000
    });
  };

  // Initiate the trade
  const startTrading = () => {
    setTraderAddress(connectedTo);
  };

  return (
    <Card className='shadow-lg rounded-md dark:border-slate-700 dark:bg-slate-900'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle className='flex justify-between items-center'>
            <span className='mb-1'>Your Connection Code</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-6 mb-2'>
        {/* My code section */}
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

        {/* Connection status */}
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
              <Button onClick={startTrading} className='w-full'>
                <span>Start trading</span>
                <ArrowRight className='h-4 w-4' />
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
  );
}
