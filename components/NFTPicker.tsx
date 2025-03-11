import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

// Mock NFT data
const mockNFTs = [
  { id: 1, name: 'Cool Cat #1', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Bored Ape #42', image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Crypto Punk #007', image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Degen Ape #69', image: '/placeholder.svg?height=300&width=300' },
  { id: 5, name: 'Punk #420', image: '/placeholder.svg?height=300&width=300' },
  { id: 6, name: 'Vibes Kid #1337', image: '/placeholder.svg?height=300&width=300' },
  { id: 7, name: 'Cool Cat #2', image: '/placeholder.svg?height=300&width=300' },
  { id: 8, name: 'Bored Ape #69', image: '/placeholder.svg?height=300&width=300' },
  { id: 9, name: 'Crypto Punk #420', image: '/placeholder.svg?height=300&width=300' },
  { id: 10, name: 'Degen Ape #1337', image: '/placeholder.svg?height=300&width=300' },
  { id: 11, name: 'Punk #007', image: '/placeholder.svg?height=300&width=300' },
  { id: 12, name: 'Vibes Kid #42', image: '/placeholder.svg?height=300&width=300' }
];

export default function NFTPicker({
  show,
  onHide,
  onConfirm
}: Readonly<{
  show: boolean;
  onHide: () => void;
  onConfirm: (e: any) => void;
}>) {
  const [selected, setSelected] = useState<any>();

  const doOnHide = () => {
    onHide();
    setSelected(null);
  };
  const doOnclick = () => {
    if (selected) onConfirm(selected);
    doOnHide();
  };

  return (
    <Dialog open={show} onOpenChange={doOnHide}>
      <DialogContent className='sm:max-w-[600px] max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Choose your NFT</DialogTitle>
          <DialogDescription>Select the NFT you would like to trade.</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 auto-rows-[50%] auto-cols-[50%] grid-flow-row gap-4 overflow-auto p-2'>
          {mockNFTs.map((nft) => (
            <button
              key={nft.id}
              className={`relative aspect-square overflow-hidden rounded-lg
                ${nft.id === selected?.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              onClick={() => setSelected(nft)}
            >
              <img src={nft.image} alt={nft.name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2'>
                <p className='text-white font-medium'>{nft.name}</p>
              </div>
              {nft.id === selected?.id && (
                <div className='absolute top-2 right-2'>
                  <CheckCircle className='text-primary' size={20} />
                </div>
              )}
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button type='submit' onClick={doOnclick}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
