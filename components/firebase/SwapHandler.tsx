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
  setOtherHasConfirmed,
  onBothConfirm
}: Readonly<{
  setOtherUserNFT: (e: any) => void;
  setHasAgreed: (e: boolean) => void;
  setOtherHasAgreed: (e: boolean) => void;
  setHasConfirmed: (e: boolean) => void;
  setOtherHasConfirmed: (e: boolean) => void;
  onBothConfirm: () => void;
}>) {
  const { user, setTraderAddress } = useMainStore();
  const { toast } = useToast();

  // Helper functions to handle different states
  const handleModifications = async (data: any) => {
    const isCurrentUserA = data.userA === user?.connectedAddress;
    const isCurrentUserB = data.userB === user?.connectedAddress;

    if (!isCurrentUserA && !isCurrentUserB) return;

    const currentUserRole = isCurrentUserA ? 'A' : 'B';
    const otherUserRole = isCurrentUserA ? 'B' : 'A';

    const otherUserNFT = data[`user${otherUserRole}NFT`];
    const otherUserHasAgreed = data[`user${otherUserRole}HasAgreed`];
    const otherUserHasConfirmed = data[`user${otherUserRole}HasConfirmed`];
    const currentUserHasAgreed = data[`user${currentUserRole}HasAgreed`];
    const currentUserHasConfirmed = data[`user${currentUserRole}HasConfirmed`];

    // Set states
    setOtherUserNFT(otherUserNFT);
    setOtherHasAgreed(otherUserHasAgreed);
    setOtherHasConfirmed(otherUserHasConfirmed);
    setHasAgreed(currentUserHasAgreed);
    setHasConfirmed(currentUserHasConfirmed);

    // Show notification only when confirmed, otherwise show agreed notification
    if (otherUserNFT && otherUserHasConfirmed && !currentUserHasConfirmed) {
      toast({
        title: 'NFT Confirmed!',
        description: 'The other user has confirmed the trade.',
        duration: 3000
      });
    } else if (otherUserNFT && otherUserHasAgreed && !currentUserHasAgreed) {
      toast({
        title: 'NFT agreed!',
        description: 'The other user has agreed to the trade.',
        duration: 3000
      });
    } else if (otherUserNFT && otherUserHasAgreed && currentUserHasAgreed && !currentUserHasConfirmed && !otherUserHasConfirmed) {
      toast({
        title: 'Both agreed!',
        description: 'Both users have agreed to the trade. Confirm to finalize the trade.',
        duration: 3000
      });
    } else if (currentUserHasConfirmed && otherUserHasConfirmed) {
      toast({
        title: 'Trade confirmed!',
        description: 'The trade has been confirmed by both parties and will now be processed.',
        duration: 3000
      });
      onBothConfirm();
    }
  };

  const handleDisconnection = async () => {
    toast({
      title: 'Disconnected!',
      description: 'The session has been aborted.',
      duration: 3000
    });
    setTraderAddress('');
    setHasAgreed(false);
    setHasConfirmed(false);
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
          handleDisconnection();
        }
      });
    });

    return () => unsubscribe();
  }, [handleDisconnection, user?.connectedAddress]);

  return null;
}
