import { create } from 'zustand';
import type { TCurrentPVZ } from '../../types/types';

interface ICurPVZ {
  currentPVZ: TCurrentPVZ;
  setCurrentPVZ: (pvz: TCurrentPVZ) => void;
}

export const useCurrentPVZ = create<ICurPVZ>((set) => ({
  currentPVZ: 'PVZ1',
  setCurrentPVZ: (newPVZ) => set({ currentPVZ: newPVZ }),
}));
