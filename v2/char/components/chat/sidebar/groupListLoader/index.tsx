import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useGroupListStore } from '../../state';

export const ChatGroupsLoader = () => {
  const { handlePagedGroups } = useGroupListStore((state) => state);

  return (
    <Button
      variant={'ghost'}
      className="min-h-[calc(8vh)] w-full rounded-none rounded-br-xl"
      onClick={handlePagedGroups}
    >
      <ChevronDown />
    </Button>
  );
};
