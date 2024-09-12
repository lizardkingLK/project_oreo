import { create } from 'zustand';

export type SidebarProps = {
  isVisible: boolean;
  toggleVisible: () => void;
};

export const useSidebarStore = create<SidebarProps>((set) => ({
  isVisible: true,
  toggleVisible: () =>
    set((state) => ({
      isVisible: !state.isVisible,
    })),
}));
