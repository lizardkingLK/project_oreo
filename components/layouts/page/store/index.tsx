import { create } from 'zustand';

interface SidepaneState {
  sidepane: boolean;
  toggle: ({ sidepane }: { sidepane: boolean }) => void;
}

const useSidePane = create<SidepaneState>((set) => ({
  sidepane: true,
  toggle: () =>
    set((state: { sidepane: boolean }) => ({ sidepane: !state.sidepane })),
}));

export default useSidePane;
