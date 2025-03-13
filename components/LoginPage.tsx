'use client';

import useMainStore from '@/hooks/use-store';
import useUrlPrefix from '@/lib/useUrlPrefix';
import { ConnectorError, ConnectorErrorType, requestRoninWalletConnector, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { Info, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';

export default function LoginPage() {
  const urlPrefix = useUrlPrefix();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  text-white p-4'>
      <div className='w-full max-w-md'>
        <Image
          src={`${urlPrefix}/android-chrome-192x192.png`}
          alt='Ronin NFT Trading'
          width={192}
          height={192}
          className='mx-auto'
          priority
        />
        <div className='mb-8 flex items-center'>
          <LogIn className='w-6 h-6' />
          <h1 className='text-2xl font-bold ml-3'>Log in to Ronin NFT Trading</h1>
        </div>

        {/* <WayPointButton /> */}
        <ConnectRoninWalletButton />

        {/* <div className='flex items-center mb-6'>
          <div className='flex-grow h-px bg-gray-700'></div>
          <span className='px-4 text-gray-400 text-sm'>OR</span>
          <div className='flex-grow h-px bg-gray-700'></div>
        </div>

        <MobileButton /> */}

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
            <Link href='/tos' className='text-blue-400'>
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
function WayPointButton() {
  const { setUser } = useMainStore();

  const loginWithWaypoint = async () => {
    // const result = await authorize({
    //   mode: 'popup',
    //   clientId: 'PfsE6vhT14GVZ1EXJ1oMGPA8OrlNE4b1',
    //   waypointOrigin: 'https://waypoint.roninchain.com'
    // });

    // console.debug('🚀 | Authorization Result:', result);
    // const accounts = result?.accounts || [];

    setUser({
      connectedAddress: 'pizza',
      userAddresses: ['pizza', 'banaan'],
      currentChainId: 2020,
      approvedAddresses: ['pizza', 'banaan']
    });
  };

  return (
    <button
      className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-full mb-3'
      onClick={loginWithWaypoint}
    >
      Login with Ronin Waypoint
    </button>
  );
}
function ConnectRoninWalletButton() {
  const { setUser } = useMainStore();

  const [connector, setConnector] = useState<RoninWalletConnector | null>(null);
  const [error, setError] = useState<ConnectorErrorType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRoninWalletConnector = async () => {
    try {
      const connector = await requestRoninWalletConnector();

      return connector;
    } catch (error) {
      if (error instanceof ConnectorError) {
        setError(error.name);
      }

      return null;
    }
  };

  const connectRoninWallet = async () => {
    setIsLoading(true);

    try {
      if (!connector && error === ConnectorErrorType.PROVIDER_NOT_FOUND) {
        window.open('https://wallet.roninchain.com', '_blank');
        throw new Error('No wallet provider found');
      }

      const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 2020;
      const connectResult = await connector?.connect(chainId);
      if (!connectResult) {
        throw new Error('No connection results');
      }

      const connectedAddress = connectResult.account;
      const currentChainId = connectResult.chainId;

      const userAddresses = await connector?.getAccounts();
      if (!userAddresses) {
        throw new Error('No user addresses found');
      }

      const approvedAddresses = await connector?.requestAccounts();
      if (!approvedAddresses) {
        throw new Error('No addresses have been approved');
      }

      setUser({
        connectedAddress,
        userAddresses,
        currentChainId,
        approvedAddresses
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Get wallet connector
  useEffect(() => {
    getRoninWalletConnector().then((connector) => {
      setConnector(connector);
    });
  }, []);

  return (
    <button
      className='w-full bg-gray-800/50 hover:bg-gray-700/50 text-white font-medium py-3 px-4 rounded-full border border-gray-700 mb-6 flex justify-center'
      onClick={connectRoninWallet}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : 'Connect with Ronin Wallet'}
    </button>
  );
}
function MobileButton() {
  const urlPrefix = useUrlPrefix();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      let newCountdown = countdown - 1;
      if (countdown === 0) newCountdown = 120;
      setCountdown(newCountdown);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
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
            <Image src={`${urlPrefix}/placeholder.svg`} alt='QR Code' width={200} height={200} className='rounded-md' />
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
  );
}
