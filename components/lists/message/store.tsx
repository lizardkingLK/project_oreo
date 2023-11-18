import { create } from 'zustand';

type State = {
  scrollLock: boolean;
};

type Actions = {
  setScrollLock: (state: boolean) => void;
};

export const useScrollLock = create<State & Actions>((set) => ({
  scrollLock: false,
  setScrollLock: (scrollLock) => set(() => ({ scrollLock })),
}));
