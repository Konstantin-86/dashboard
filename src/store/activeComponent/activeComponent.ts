import { create } from 'zustand';
import type { TCurrentWidget } from '../../types/types';

interface IActiveComponent {
  activeWidget: TCurrentWidget;
  setActiveWidget: (widget: TCurrentWidget) => void;
}

export const useActiveComponent = create<IActiveComponent>((set) => ({
  activeWidget: 'mainTable',
  setActiveWidget: (widget) => set({ activeWidget: widget }),
}));
