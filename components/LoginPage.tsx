'use client';

import useMainStore from '@/hooks/use-store';
import { Info, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { setUser } = useMainStore();
  const [countdown, setCountdown] = useState(43);

  const loginWithWaypoint = () => setUser({ address: '0xwaypoint', signature: '0x1234567890' });
  const loginWithWallet = () => setUser({ address: '0xwallet', signature: '0x1234567890' });

  useEffect(() => {
    const timer = setTimeout(() => {
      let newCountdown = countdown - 1;
      if (countdown === 0) newCountdown = 120;
      setCountdown(newCountdown);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  text-white p-4'>
      <div className='w-full max-w-md'>
        <div className='mb-8 flex items-center'>
          <LogIn className='w-6 h-6' />
          <h1 className='text-2xl font-bold ml-3'>Log in to Ronin NFT Trading</h1>
        </div>

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-full mb-3'
          onClick={loginWithWaypoint}
        >
          Login with Ronin Waypoint
        </button>

        <button
          className='w-full bg-gray-800/50 hover:bg-gray-700/50 text-white font-medium py-3 px-4 rounded-full border border-gray-700 mb-6'
          onClick={loginWithWallet}
        >
          Connect with Ronin Wallet
        </button>

        <div className='flex items-center mb-6'>
          <div className='flex-grow h-px bg-gray-700'></div>
          <span className='px-4 text-gray-400 text-sm'>OR</span>
          <div className='flex-grow h-px bg-gray-700'></div>
        </div>

        <div className='text-center mb-4'>
          <h2 className='text-lg font-medium mb-2'>Instant log in with QR code</h2>
          <p className='text-gray-400 text-sm mb-4'>
            Scan this QR code with{' '}
            <Link href='#' className='text-blue-400'>
              Ronin Mobile app
            </Link>
          </p>

          <div className='flex justify-center mb-2'>
            <div className='bg-white p-2 rounded-lg inline-block'>
              <div className='relative w-48 h-48'>
                <Image
                  src='/placeholder.svg?height=200&width=200'
                  alt='QR Code'
                  width={200}
                  height={200}
                  className='rounded-md'
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='bg-blue-500 p-1 rounded-md'>
                    <div className='border-2 border-white p-1 rounded-md'>
                      <div className='text-white'>
                        <svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M8 0C3.6 0 0 3.6 0 8V16C0 18.2 1.8 20 4 20H12C14.2 20 16 18.2 16 16V8C16 3.6 12.4 0 8 0ZM12 16H4V8C4 5.8 5.8 4 8 4C10.2 4 12 5.8 12 8V16Z'
                            fill='white'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className='text-gray-400 text-sm'>Countdown refresh in {countdown}s</p>
        </div>

        <div className='text-center mt-8 mb-4'>
          <p className='text-gray-400 text-sm'>
            Don't have an account?{' '}
            <Link href='https://waypoint.roninchain.com/register' target='_blank' className='text-blue-400'>
              Sign up
            </Link>
          </p>
        </div>

        <div className='flex items-center justify-center text-xs text-gray-400'>
          <Info className='w-4 h-4 mr-1' />
          <p>
            By continuing, you agree to our{' '}
            <Link href='#' className='text-blue-400'>
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
