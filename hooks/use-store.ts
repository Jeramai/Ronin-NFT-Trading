import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  connectedAddress: string;
  userAddresses: string[];
  approvedAddresses: string[];
  currentChainId: number;
}
interface MainStorage {
  user: User | null;
  setUser: (data: User | null) => void;
  traderAddress: string | null;
  setTraderAddress: (data: string | null) => void;
  sessionCode: string | null;
  setSessionCode: (data: string | null) => void;
}

const useMainStore = create<MainStorage>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (data: User | null) => set(() => ({ user: data })),
      traderAddress: null,
      setTraderAddress: (data: string | null) => set(() => ({ traderAddress: data })),
      sessionCode: null,
      setSessionCode: (data: string | null) => set(() => ({ sessionCode: data }))
    }),
    {
      name: 'main-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);

export default useMainStore;
