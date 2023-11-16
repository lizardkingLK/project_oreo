import { create } from 'zustand';

type State = {
  navbar: boolean;
};

type Actions = {
  setNavbar: (navbar: boolean) => void;
};

export const useNavbar = create<State & Actions>((set) => ({
  navbar: false,
  setNavbar: (navbar: boolean) => set(() => ({ navbar })),
}));
