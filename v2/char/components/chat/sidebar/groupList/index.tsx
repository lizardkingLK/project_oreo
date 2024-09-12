'use client';

import { useEffect, useRef, useState } from 'react';
import { useGroupListStore } from '../../state';
import { GroupListItem } from './GroupListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { GroupListSkeleton } from './GroupListSkeleton';

export const ChatGroupsSection = () => {
  const [isLoading, setLoading] = useState(true);

  const { pagedGroups, initializePagedGroups } = useGroupListStore(
    (state) => state
  );

  const groupListEndRef = useRef<HTMLDivElement>(null);

  const [groupListParent] = useAutoAnimate();

  useEffect(() => {
    initializePagedGroups();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (groupListEndRef.current) {
      groupListEndRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [pagedGroups]);

  if (isLoading) {
    return <GroupListSkeleton />;
  }

  return (
    <ScrollArea>
      <div className="flex flex-col" ref={groupListParent}>
        {pagedGroups.map((pagedGroup) => (
          <GroupListItem key={pagedGroup.id} {...pagedGroup} />
        ))}
      </div>
      <div ref={groupListEndRef}></div>
    </ScrollArea>
  );
};
