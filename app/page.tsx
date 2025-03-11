'use client';

import LoginPage from '@/components/LoginPage';
import LogoutButton from '@/components/LogoutButton';
import SwapCode from '@/components/SwapCode';
import SwapTrade from '@/components/SwapTrade';
import useMainStore from '@/hooks/use-store';

export default function Home() {
  const { user, traderAddress } = useMainStore();

  if (!user) return <LoginPage />;
  return (
    <div className='flex flex-col justify-between px-4 pt-8 h-screen w-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden'>
      <main className='container flex flex-col mx-auto gap-4'>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold mb-16 sm:mb-3'>Ronin NFT Trading</h1>
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
