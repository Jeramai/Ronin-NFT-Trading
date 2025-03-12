import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useMainStore from '@/hooks/use-store';
import '@/styles/scrollbar.css';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';

export default function NFTPicker({
  show,
  onHide,
  onConfirm
}: Readonly<{
  show: boolean;
  onHide: () => void;
  onConfirm: (e: any) => void;
}>) {
  const { user } = useMainStore();

  const requestParams = { address: user?.connectedAddress ?? '', chain: 2020, mediaItems: true, excludeSpam: true };
  const { fetch } = useEvmWalletNFTs();

  const [selected, setSelected] = useState<any>();

  const [nfts, setNfts] = useState<any[]>();
  const [cursor, setCursor] = useState<string>('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const doOnHide = () => {
    onHide();
    setSelected(null);
  };
  const doOnclick = () => {
    if (selected && nfts?.length) onConfirm(nfts.find((n) => n.tokenHash === selected));
    doOnHide();
  };
  const loadMore = () => {
    setIsFetching(true);
    Promise.resolve(fetch({ ...requestParams, cursor }))
      .then((fetchedNFTs) => {
        if (!fetchedNFTs?.data?.length) return;

        setNfts((n) => [...(n ?? []), ...fetchedNFTs.data]);
        setCursor(fetchedNFTs.cursor ?? '');
        setHasNextPage(fetchedNFTs.data.length !== 100);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsFetching(false));
  };

  // Fetch initial NFT data
  useEffect(() => {
    if (!nfts && user?.connectedAddress) loadMore();
  }, [nfts?.length, user?.connectedAddress]);

  return (
    <Dialog open={show} onOpenChange={doOnHide}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Choose your NFT</DialogTitle>
          <DialogDescription>Select the NFT you would like to trade.</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 grid-flow-row gap-4 overflow-auto p-2'>
          {nfts
            ?.filter((nft) => nft.metadata?.image ?? nft.media?.originalMediaUrl)
            ?.map((nft) => {
              return (
                <button
                  key={nft.tokenHash}
                  className={`relative aspect-square overflow-hidden rounded-lg w-full pb-[100%]
                ${nft.tokenHash === selected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  onClick={() => setSelected(nft.tokenHash)}
                >
                  <Image
                    src={nft.metadata?.image ?? nft.media?.originalMediaUrl ?? '/placeholder.svg'}
                    alt={nft.name ?? 'NFT'}
                    fill
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2'>
                    <p title={nft.metadata?.name ?? nft.name} className='text-white font-medium truncate'>
                      {nft.metadata?.name ?? nft.name}
                    </p>
                  </div>
                  {nft.tokenHash === selected && (
                    <div className='absolute top-2 right-2'>
                      <CheckCircle className='text-primary' size={20} />
                    </div>
                  )}
                </button>
              );
            })}
        </div>

        {isFetching ? (
          <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center p-6 bg-background/80 rounded-lg select-none'>
            <Spinner className='text-muted-foreground' />
            <div className='text-muted-foreground font-medium italic'>Loading NFT data..</div>
          </div>
        ) : null}
        <DialogFooter>
          {!hasNextPage ? (
            <Button onClick={loadMore} disabled={hasNextPage} variant='secondary'>
              Load more
            </Button>
          ) : null}
          <Button type='submit' disabled={!selected} onClick={doOnclick}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
