import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  connectedAddress: string;
  userAddresses: string[];
  currentChainId: number;
}
interface MainStorage {
  user: User | null;
  setUser: (data: User | null) => void;
  traderAddress: string | null;
  setTraderAddress: (data: string) => void;
}

const useMainStore = create<MainStorage>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (data: User | null) => set(() => ({ user: data })),
      traderAddress: null,
      setTraderAddress: (data: string) => set(() => ({ traderAddress: data }))
    }),
    {
      name: 'main-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);

export default useMainStore;
