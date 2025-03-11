import { Button } from '@/components/ui/button';
import useMainStore from '@/hooks/use-store';
import { LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  const { setUser, setTraderAddress } = useMainStore();

  return (
    <Button
      variant='ghost'
      onClick={() => {
        setUser(null);
        setTraderAddress(null);
        redirect('/');
      }}
    >
      <LogOutIcon size={16} />
    </Button>
  );
}
