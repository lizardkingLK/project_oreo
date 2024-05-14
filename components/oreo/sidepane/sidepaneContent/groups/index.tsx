import { GroupState, useGroup } from '@/components/oreo/layouts/group';
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { create } from 'zustand';

interface GroupsState {
  groups: GroupState[];
  setGroups: ({ groups }: { groups: GroupState[] }) => void;
}

const staticGroups = [
  {
    id: 1,
    name: 'Neil Sims',
    profilePicture: '/static/pfp1.jpg',
    description: 'Gamers rise up',
    email: 'email@flowbite.com',
    unread: null,
  },
  {
    id: 2,
    name: 'John Mclane',
    profilePicture: '/static/pfp2.jpg',
    description: 'Yippee Ka Yay',
    email: 'email@yippee.com',
    unread: 1,
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
  const { id, name, description, profilePicture, email, unread } = group;

  const handleClick = () => {
    setGroup({ group: groups.find((g) => g.id === id) });
    router.push(`/group/${id}`);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center space-x-4 p-3 hover:bg-gray-900 rtl:space-x-reverse sm:pb-4"
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
            {email}
          </p>
        </div>
        <div className="inline-flex items-center text-right text-base font-semibold text-gray-900 dark:text-white">
          {unread}
        </div>
      </button>
    </li>
  );
};

const GroupItems = () => {
  const { groups } = useGroups();

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {groups.map((group, _) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </ul>
  );
};

export default GroupItems;
