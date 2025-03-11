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

export default function FirebaseHandler() {
  const { user, setTraderAddress } = useMainStore();
  const { toast } = useToast();

  // Helper functions to handle different states
  const handleDisconnection = async (isHost: boolean) => {
    toast({
      title: 'Disconnected!',
      description: 'The session has been aborted.',
      duration: 3000
    });
    setTraderAddress('');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'codes'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as FirebaseData;

        if (change.type === 'removed') {
          handleDisconnection(data.userA === user?.connectedAddress);
        }
      });
    });

    return () => unsubscribe();
  }, [handleDisconnection, user?.connectedAddress]);

  return null;
}
