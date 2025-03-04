import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  address: string;
  signature: string;
}
interface MainStorage {
  user: User | undefined;
  setUser: (data: User) => void;
  traderAddress: string | undefined;
  setTraderAddress: (data: string) => void;
}

const useMainStore = create<MainStorage>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (data: User) => set(() => ({ user: data })),
      traderAddress: undefined,
      setTraderAddress: (data: string) => set(() => ({ traderAddress: data }))
    }),
    {
      name: 'main-storage'
    }
  )
);

export default useMainStore;
