'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useMainStore from '@/hooks/use-store';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Mock NFT data
const mockNFTs = [
  { id: 1, name: 'Cool Cat #1', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Bored Ape #42', image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Crypto Punk #007', image: '/placeholder.svg?height=300&width=300' }
];

export default function NFTSelection() {
  const { user, traderAddress } = useMainStore();

  const [selectedNFT, setSelectedNFT] = useState<(typeof mockNFTs)[0] | null>(null);
  const [otherUserNFT, setOtherUserNFT] = useState<(typeof mockNFTs)[0] | null>(null);
  const [hasAgreed, setHasAgreed] = useState(false);

  const resetOwnNFT = () => {
    setSelectedNFT(null);
  };
  const selectOwnNFT = () => {
    setSelectedNFT(mockNFTs[Math.floor(Math.random() * mockNFTs.length)]);
  };
  const confirmTrade = () => {};

  useEffect(() => {
    setHasAgreed(false);

    if (selectedNFT) {
      const t = setTimeout(() => {
        setOtherUserNFT(mockNFTs[Math.floor(Math.random() * mockNFTs.length)]);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [selectedNFT]);

  return (
    <div className='flex flex-col gap-4 w-full max-w-4xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto'>
        {/* User's NFT selection */}
        <Card className='flex flex-col p-3 w-full shadow-lg dark:border-slate-700 dark:bg-slate-900'>
          <CardHeader className='border-b mb-3 !p-0'>
            <div className='mb-2'>
              <CardTitle className='flex justify-between mb-1'>
                <span>Your NFT</span>
                {selectedNFT ? (
                  <button onClick={resetOwnNFT}>
                    <RotateCcw className='h-4 w-4' />
                  </button>
                ) : null}
              </CardTitle>
              <div className='text-xs text-gray-500'>{user?.address ?? '0x12345'}</div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center md:aspect-square !p-0'>
            {selectedNFT ? (
              <div className='text-center'>
                <Image
                  src={selectedNFT.image || '/placeholder.svg'}
                  alt={selectedNFT.name}
                  width={200}
                  height={200}
                  className='rounded-lg mb-2'
                />
                <p className='font-medium'>{selectedNFT.name}</p>
              </div>
            ) : (
              <button
                className='border-4 border-dashed rounded-md w-full h-full flex flex-col items-center justify-center'
                onClick={selectOwnNFT}
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
          <CardContent className='flex flex-col items-center justify-center md:aspect-square !p-0'>
            {otherUserNFT ? (
              <div className='text-center'>
                <Image
                  src={otherUserNFT.image || '/placeholder.svg'}
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
        {hasAgreed ? (
          <Button
            disabled={!selectedNFT || !otherUserNFT}
            onClick={confirmTrade}
            className='w-fit sm:w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <span>Confirm Trade</span>
          </Button>
        ) : (
          <Button className='w-fit sm:w-full' disabled={!selectedNFT || !otherUserNFT} onClick={() => setHasAgreed(true)}>
            Agree to this Trade
          </Button>
        )}
      </div>
    </div>
  );
}
