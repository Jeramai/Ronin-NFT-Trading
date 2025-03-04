'use client';

import LoginPage from '@/components/LoginPage';
import Swap from '@/components/Swap';
import SwapCode from '@/components/SwapCode';
import useMainStore from '@/hooks/use-store';

export default function Home() {
  const { user, traderAddress } = useMainStore();

  if (!user) return <LoginPage />;
  return (
    <main className='container flex flex-col mx-auto px-4 py-8 h-screen w-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900'>
      <h1 className='text-4xl font-bold mb-6'>Ronin NFT Trading</h1>
      {traderAddress ? <Swap /> : <SwapCode />}
    </main>
  );
}
