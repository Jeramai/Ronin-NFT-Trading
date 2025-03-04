import { Toaster } from '@/components/ui/toaster';
import useMainStore from '@/hooks/use-store';
import { Suspense } from 'react';
import NFTSelection from './NFTSelection';

export default function SwapConnect() {
  const { traderAddress } = useMainStore();

  return (
    <div className='flex flex-1 flex-col items-center justify-center py-8'>
      <div className='w-full max-w-2xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-center mb-2 dark:text-white'>Trading time!</h1>
          <p className='text-slate-600 dark:text-slate-400 text-center'>
            {`You're currently trading with `}
            <code>{traderAddress}</code>
            {`.`}
            <br />
            {`Make sure you only agree to trades you're happy with!`}
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <NFTSelection />
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
}
