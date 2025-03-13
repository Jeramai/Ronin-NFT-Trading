'use client';

import LoginPage from '@/components/LoginPage';
import LogoutButton from '@/components/LogoutButton';
import SwapCode from '@/components/SwapCode';
import SwapTrade from '@/components/SwapTrade';
import useMainStore from '@/hooks/use-store';
import useUrlPrefix from '@/lib/useUrlPrefix';
import Image from 'next/image';

export default function Home() {
  const { user, traderAddress } = useMainStore();
  const urlPrefix = useUrlPrefix();

  if (!user) return <LoginPage />;
  return (
    <div className='flex flex-col justify-between px-4 pt-8 h-screen w-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden'>
      <main className='container flex flex-col mx-auto gap-4'>
        <div className='flex justify-between'>
          <div className='flex gap-3 mb-16 sm:mb-3'>
            <div className='relative h-full aspect-square ahidden sm:blocka'>
              <Image src={`${urlPrefix}/logo-64x64.png`} alt='logo' fill className='object-contain' />
            </div>
            <h1 className='text-4xl font-bold'>Ronin NFT Trading</h1>
          </div>
          <LogoutButton />
        </div>
        {traderAddress ? <SwapTrade /> : <SwapCode />}
      </main>
      <footer className='mb-1 text-[8pt] text-center'>
        <span>Made with {'🍕'} by </span>
        <a href='https://jeramai.github.io' target='_blank'>
          Jeram.ai
        </a>
      </footer>
    </div>
  );
}
