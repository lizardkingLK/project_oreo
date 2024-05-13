import React from 'react';
import { create } from 'zustand';
import SidepaneContent from './sidepaneContent';

interface SidepaneState {
  sidepane: boolean;
  toggle: ({ sidepane }: { sidepane: boolean }) => void;
}

export const useSidePane = create<SidepaneState>((set) => ({
  sidepane: true,
  toggle: () =>
    set((state: { sidepane: boolean }) => ({ sidepane: !state.sidepane })),
}));

const SidePane = () => {
  return (
    <div className="p-2">
      <SidepaneContent />
    </div>
  );
};

export default SidePane;
