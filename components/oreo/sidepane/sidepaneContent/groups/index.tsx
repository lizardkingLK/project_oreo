import { GroupState, useGroup } from '@/components/oreo/layouts/group';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { create } from 'zustand';

interface GroupsState {
  groups: GroupState[];
  setGroups: ({ groups }: { groups: GroupState[] }) => void;
}

const staticGroups: GroupState[] = [
  {
    id: 100,
    name: 'Neil Sims',
    profilePicture: '/static/pfp1.jpg',
    description: 'Gamers rise up',
    email: 'email@flowbite.com',
    type: 1,
    messages: [
      {
        id: 1,
        content: 'Hi',
        type: 1,
        ownerId: 10,
        createdOn: 1715253116065,
      },
      {
        id: 2,
        content: 'Hello',
        type: 1,
        ownerId: 11,
        createdOn: 1715753816065,
      },
      {
        id: 3,
        content: 'Hello34',
        type: 1,
        ownerId: 11,
        createdOn: 1716753816065,
      },
      {
        id: 4,
        content: 'yo whats up',
        type: 1,
        ownerId: 10,
        createdOn: new Date().getTime(),
      },
    ],
  },
  {
    id: 101,
    name: 'My Group',
    profilePicture: '/static/pfp6.jpg',
    description: 'Yippee Ka Yay',
    unread: 1,
    type: 2,
    messages: [
      {
        id: 3,
        content: 'Hello o',
        type: 1,
        ownerId: 11,
        createdOn: 1715753616065,
      },
    ],
  },
];

export const useGroups = create<GroupsState>((set) => ({
  groups: staticGroups,
  setGroups: () =>
    set((state: { groups: GroupState[] }) => ({ groups: state.groups })),
}));

const GroupItem = ({ group }: { group: GroupState }) => {
  const router = useRouter();
  const { groups } = useGroups();
  const { setGroup } = useGroup();
  const { id, name, description, profilePicture, unread } = group;

  const handleClick = () => {
    setGroup({ group: groups.find((g) => g.id === id) });
    router.push(`/group/${id}`);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center space-x-4 p-4 hover:bg-gray-900 rtl:space-x-reverse sm:pb-4"
      >
        <div className="flex-shrink-0">
          <Image
            className="h-8 w-8 rounded-full"
            src={profilePicture}
            alt={description}
            width={30}
            height={30}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-left text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="truncate text-left text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        {unread && (
          <div className="inline-flex items-center rounded-full bg-red-500 text-right text-base font-semibold text-gray-900 dark:text-white">
            <div className="-end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white transition-opacity dark:border-gray-900">
              {unread}
            </div>
          </div>
        )}
      </button>
    </li>
  );
};

const GroupItems = () => {
  const { groups } = useGroups();

  return (
    <ul className="max-w-md">
      {groups.map((group, _) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </ul>
  );
};

export default GroupItems;
