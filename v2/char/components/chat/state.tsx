import { create } from 'zustand';
import { UserGroupProps } from './types';

const itemsPerPage = 5;

export type UserGroupListProps = {
  page: number;
  userGroups: UserGroupProps[];
  pagedGroups: UserGroupProps[];
  activeGroup: UserGroupProps | null;
  initializePagedGroups: () => void;
  handlePagedGroups: () => void;
  handleGroupChange: (id: number) => void;
};

export const useGroupListStore = create<UserGroupListProps>((set) => ({
  page: 0,
  userGroups: [],
  pagedGroups: [],
  activeGroup: null,
  initializePagedGroups: () =>
    set((state) => ({
      page: 1,
      userGroups: Array(100)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          groupId: `Group ${i + 1}`,
          name: `Group ${i + 1}`,
        })),
      pagedGroups: state.userGroups.slice(0, itemsPerPage),
    })),
  handlePagedGroups: () =>
    set((state) => ({
      page: state.page + 1,
      pagedGroups: [
        ...state.pagedGroups,
        ...state.userGroups.slice(
          state.page * itemsPerPage,
          (state.page + 1) * itemsPerPage
        ),
      ],
    })),
  handleGroupChange: (id: number) =>
    set((state) => ({
      activeGroup: state.pagedGroups.find((item) => item.id === id),
    })),
}));
