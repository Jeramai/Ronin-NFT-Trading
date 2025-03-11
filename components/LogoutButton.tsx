import { Button } from '@/components/ui/button';
import useMainStore from '@/hooks/use-store';
import { LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  const { setUser } = useMainStore();

  return (
    <Button
      variant='ghost'
      onClick={() => {
        setUser(null);
        redirect('/');
      }}
    >
      <LogOutIcon size={16} />
    </Button>
  );
}
