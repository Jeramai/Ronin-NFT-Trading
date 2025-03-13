import CodeConnector from '@/components/CodeConnector';
import { Suspense } from 'react';

export default function SwapCode() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center py-8'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-2 dark:text-white'>Trade Connect</h1>
        <p className='text-slate-600 dark:text-slate-400 text-center mb-8'>Share your code or enter someone else's to connect</p>

        <Suspense fallback={<div>Loading...</div>}>
          <CodeConnector />
        </Suspense>
      </div>
    </div>
  );
}
