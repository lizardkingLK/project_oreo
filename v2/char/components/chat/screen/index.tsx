'use client';

import React from 'react';
import { useGroupListStore } from '../state';
import { MessageItemList } from './messageItemList';
import { ChatScreenHeader } from './chatScreenHeader';
import { ChatScreenEditor } from './chatScreenEditor';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '../sidebar/state';

export const ChatScreenSection = () => {
  const { isVisible } = useSidebarStore((state) => state);

  const { activeGroup } = useGroupListStore((state) => state);

  return (
    <section
      className={cn(
        isVisible ? 'w-[calc(70vw)]' : 'w-[calc(100vw)]',
        'h-[calc(94vh)]'
      )}
    >
      <ChatScreenHeader activeGroup={activeGroup} />
      <MessageItemList />
      <ChatScreenEditor />
    </section>
  );
};
