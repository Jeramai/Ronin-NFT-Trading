import { Button } from '@/components/ui/button';
import useMainStore from '@/hooks/use-store';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { setUser, sessionCode, setTraderAddress, setSessionCode, setTradeIndex } = useMainStore();

  const router = useRouter();

  const onLogout = async () => {
    if (sessionCode) {
      const q = query(collection(db, 'codes'), where('code', '==', sessionCode));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'codes', docSnapshot.id));
      });

      setTradeIndex(null);
      setSessionCode(null);
    }

    setUser(null);
    setTraderAddress(null);

    router.push('/');
  };

  return (
    <Button variant='ghost' onClick={onLogout}>
      <LogOutIcon size={16} />
    </Button>
  );
}
