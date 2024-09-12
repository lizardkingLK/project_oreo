'use client';

import { cn } from '@/lib/utils';
import { ChatGroupsSection } from './groupList';
import { ChatGroupsLoader } from './groupListLoader';
import { useSidebarStore } from './state';

export const ChatSidebarSection = () => {
  const { isVisible } = useSidebarStore((state) => state);

  return (
    <aside
      className={cn(
        isVisible
          ? 'shadow-card flex flex-col justify-between drop-shadow-2xl'
          : 'hidden shadow-none',
        'from-accent to-card bg-gradient-to-r',
        'h-[calc(94vh)] w-[calc(60vw)]',
        'absolute top-[calc(6vh)] z-10 rounded-r-xl shadow-lg',
        'md:relative md:top-0 md:h-full md:w-[calc(30vw)] md:bg-inherit md:shadow-none md:drop-shadow-none'
      )}
    >
      <ChatGroupsSection />
      <ChatGroupsLoader />
    </aside>
  );
};
