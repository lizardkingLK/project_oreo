import { Avatar } from '@/components/avatar';
import React from 'react';
import { useGroupListStore } from '../../state';

export const ChatScreenHeader = () => {
  const { activeGroup } = useGroupListStore((state) => state);

  if (!activeGroup)
  {
    return null;
  }

  return (
    <div className="flex h-[calc(8vh)] items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Avatar />
        <div>
          <h1 className="font-black">
            Chat Screen Section - Group Id {activeGroup?.id}
          </h1>
          <small className="dark:text-gray-400">Last Online 12:45</small>
        </div>
      </div>
    </div>
  );
};
