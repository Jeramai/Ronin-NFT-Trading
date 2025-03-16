'use client';

import useMainStore from '@/hooks/use-store';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

interface FirebaseHandlerProps {
  myCode: string;
  inputCode: string;
  aIsReady: boolean;
  bIsReady: boolean;
  setIsConnected: (connected: boolean) => void;
  setConnectedTo: (code: string) => void;
  setAIsReady: (ready: boolean) => void;
  setBIsReady: (ready: boolean) => void;
}
interface FirebaseData {
  code: string;
  userA: string;
  userB: string | null;
  userAReady: boolean;
  userBReady: boolean;
  tradeIndex: number;
}

export default function FirebaseHandler({
  myCode,
  inputCode,
  aIsReady,
  bIsReady,
  setIsConnected,
  setConnectedTo,
  setAIsReady,
  setBIsReady
}: Readonly<FirebaseHandlerProps>) {
  const { user, setTraderAddress, setSessionCode, setTradeIndex } = useMainStore();
  const { toast } = useToast();

  // Helper functions to handle different states
  const handleConnection = (data: FirebaseData, isHost: boolean) => {
    toast({
      title: 'Connection established!',
      description: isHost ? 'A user has connected to you.' : 'You have been successfully connected!',
      duration: 3000
    });
    setIsConnected(true);
    setConnectedTo(isHost ? data.code : inputCode);
  };
  const handleDisconnection = (isHost: boolean) => {
    toast({
      title: 'Disconnected!',
      description: isHost ? 'The session has ended.' : 'The other user ended the session.',
      duration: 3000
    });
    setIsConnected(false);
    setConnectedTo('');
    setAIsReady(false);
    setBIsReady(false);
  };
  const handleUserReady = (isCurrentUser: boolean) => {
    toast({
      title: 'User ready!',
      description: isCurrentUser ? 'The other user has been notified that you are ready.' : 'The other user is ready to trade.',
      duration: 3000
    });
    if (isCurrentUser) setAIsReady(true);
    else setBIsReady(true);
  };
  const handleModifiedState = (data: FirebaseData) => {
    const isCurrentUserA = data.userA === user?.connectedAddress;
    const isCurrentUserB = data.userB === user?.connectedAddress;

    // Connection cases
    if (!data.userAReady && !data.userBReady) {
      if (isCurrentUserB && data.code === inputCode) {
        handleConnection(data, false);
      } else if (isCurrentUserA && data.userB && data.code === myCode) {
        handleConnection(data, true);
      }
    }

    // Ready state cases
    const userReadyCondition =
      (isCurrentUserA && !data.userAReady && data.userBReady) || (isCurrentUserB && data.userAReady && !data.userBReady);
    if (userReadyCondition) {
      handleUserReady(false);
    }

    const currentUserReadyCondition =
      (isCurrentUserA && data.userAReady && !data.userBReady) || (isCurrentUserB && !data.userAReady && data.userBReady);
    if (currentUserReadyCondition) {
      handleUserReady(true);
    }

    // Disconnection cases
    if (data.userB === null) {
      if (data.code === inputCode && !isCurrentUserA) {
        handleDisconnection(false);
      }
    }

    // Update ready states
    if (!aIsReady) setAIsReady(data.userAReady);
    if (!bIsReady) setBIsReady(data.userBReady);
    if (data.userAReady && data.userBReady) {
      setTradeIndex(data.tradeIndex);
      setSessionCode(data.code);
      setTraderAddress(isCurrentUserA ? data.userB : data.userA);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'codes'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as FirebaseData;

        if (change.type === 'modified') {
          handleModifiedState(data);
        } else if (change.type === 'removed') {
          handleDisconnection(data.code === myCode);
        }
      });
    });

    return () => unsubscribe();
  }, [myCode, handleDisconnection, handleModifiedState]);

  return null;
}
