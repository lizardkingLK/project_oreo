import React from 'react';
import { create } from 'zustand';

interface GroupState {
  id: number;
  name: string;
  description?: string;
  profilePicture?: string;
}

interface GroupsState {
  groups: GroupState[];
  setGroups: ({ groups }: { groups: GroupState[] }) => void;
}

export const useGroups = create<GroupsState>((set) => ({
  groups: [],
  setGroups: () =>
    set((state: { groups: GroupState[] }) => ({ groups: state.groups })),
}));

const SidepaneContent = () => {
  return <div>sidepaneContent</div>;
};

export default SidepaneContent;
