'use client';

import useMainStore from '@/hooks/use-store';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

interface FirebaseData {
  code: string;
  userA: string;
  userB: string | null;
  userAReady: boolean;
  userBReady: boolean;
}

export default function FirebaseHandler({
  setOtherUserNFT,
  setHasAgreed,
  setOtherHasAgreed,
  setHasConfirmed,
  setOtherHasConfirmed
}: Readonly<{
  setOtherUserNFT: (e: any) => void;
  setHasAgreed: (e: boolean) => void;
  setOtherHasAgreed: (e: boolean) => void;
  setHasConfirmed: (e: boolean) => void;
  setOtherHasConfirmed: (e: boolean) => void;
}>) {
  const { user, setTraderAddress } = useMainStore();
  const { toast } = useToast();

  // Helper functions to handle different states
  const handleModifications = async (data: any) => {
    const isCurrentUserA = data.userA === user?.connectedAddress;
    const isCurrentUserB = data.userB === user?.connectedAddress;

    if (isCurrentUserB) {
      setOtherUserNFT(data.userANFT);
      setOtherHasAgreed(data.userAHasAgreed);
      setOtherHasConfirmed(data.userAHasConfirmed);

      setHasAgreed(data.userBHasAgreed);
      setHasConfirmed(data.userBHasConfirmed);
    } else if (isCurrentUserA) {
      setOtherUserNFT(data.userBNFT);
      setOtherHasAgreed(data.userBHasAgreed);
      setOtherHasConfirmed(data.userBHasConfirmed);

      setHasAgreed(data.userAHasAgreed);
      setHasConfirmed(data.userAHasConfirmed);
    }
  };
  const handleDisconnection = async (isHost: boolean) => {
    toast({
      title: 'Disconnected!',
      description: 'The session has been aborted.',
      duration: 3000
    });
    setTraderAddress('');
    setOtherUserNFT(false);
    setOtherHasAgreed(false);
    setOtherHasConfirmed(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'codes'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as FirebaseData;

        if (change.type === 'modified') {
          handleModifications(data);
        } else if (change.type === 'removed') {
          handleDisconnection(data.userA === user?.connectedAddress);
        }
      });
    });

    return () => unsubscribe();
  }, [handleDisconnection, user?.connectedAddress]);

  return null;
}
