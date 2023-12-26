import { create } from 'zustand';

type groupType = {};

type State = {
  groups: groupType[];
};

type Actions = {
  setGroups: (state: groupType[]) => void;
};

export const useGroups = create<State & Actions>((set) => ({
  groups: [],
  setGroups: (groups) => set(() => ({ groups })),
}));
