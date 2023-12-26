import { sections } from '@/utils/enums';
import { create } from 'zustand';

type State = {
  section: sections;
};

type Actions = {
  setSection: (state: sections) => void;
};

export const useSection = create<State & Actions>((set) => ({
  section: sections.loading,
  setSection: (section) => set(() => ({ section })),
}));
