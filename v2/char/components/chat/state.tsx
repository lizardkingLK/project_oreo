import { create } from 'zustand';
import { MessageProps, UserGroupProps } from './types';

const itemsPerPage = 5;

export type UserGroupListProps = {
  page: number;
  userGroups: UserGroupProps[];
  pagedGroups: UserGroupProps[];
  activeGroup: UserGroupProps | null;
  initializePagedGroups: () => void;
  handlePagedGroups: () => void;
  handleGroupChange: (id: number) => void;
  updateMessages: (message: MessageProps) => void;
};

export const useGroupListStore = create<UserGroupListProps>((set) => ({
  page: 0,
  userGroups: [],
  pagedGroups: [],
  activeGroup: null,
  initializePagedGroups: () =>
    set((state) => ({
      page: 1,
      userGroups: Array(99)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          groupId: `Group ${i + 1}`,
          name: `Group ${i + 1}`,
          Message: [],
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
  updateMessages: (message: MessageProps) =>
    set((state) => {
      const { groupId } = message;

      let { pagedGroups, activeGroup, userGroups } = state;

      // active group messages update
      const isActiveGroup = state.activeGroup?.id === groupId;
      if (state.activeGroup && isActiveGroup) {
        activeGroup = {
          ...state.activeGroup,
          Message: [...state.activeGroup.Message, message],
        };
        state.activeGroup = activeGroup;
      }

      // user group messages update
      const userGroupIndex = userGroups.findIndex(({ id }) => id === groupId);
      if (userGroupIndex !== -1) {
        let groupToUpdate = userGroups.splice(userGroupIndex, 1)[0];
        groupToUpdate = {
          ...groupToUpdate,
          Message: [...groupToUpdate.Message, message],
        };
        userGroups = [groupToUpdate, ...userGroups];
        state.userGroups = userGroups;
      }

      // paged group messages update
      const pagedGroupIndex = pagedGroups.findIndex(({ id }) => id === groupId);
      if (pagedGroupIndex !== -1) {
        let groupToUpdate = pagedGroups.splice(pagedGroupIndex, 1)[0];
        groupToUpdate = {
          ...groupToUpdate,
          Message: [...groupToUpdate.Message, message],
        };
        pagedGroups = [groupToUpdate, ...pagedGroups];
        state.pagedGroups = pagedGroups;
      }

      return { ...state };
    }),
}));
