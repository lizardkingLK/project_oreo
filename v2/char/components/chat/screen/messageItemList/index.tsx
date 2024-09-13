import React, { useEffect, useMemo, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Incoming } from '../chatScreenItem/incoming';
import { Outgoing } from '../chatScreenItem/outgoing';
import { useGroupListStore } from '../../state';

export const MessageItemList = () => {
  const userId = useMemo(() => 1, []);

  const scrollEndRef = useRef<HTMLDivElement>(null);

  const { activeGroup } = useGroupListStore((state) => state);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeGroup?.Message]);

  if (!activeGroup) {
    return null;
  }

  const messages = activeGroup.Message;

  return (
    <ScrollArea className="h-[calc(74vh)] p-4">
      {messages.map((message) => {
        const { authorId, id } = message;

        if (authorId === userId) {
          return <Outgoing key={id} {...message} />;
        } else {
          return <Incoming key={id} {...message} />;
        }
      })}
      <div ref={scrollEndRef} className="h-6"></div>
    </ScrollArea>
  );
};
