import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';
import { Incoming } from '../chatScreenItem/incoming';
import { Outgoing } from '../chatScreenItem/outgoing';
import { MessageProps } from '../../types';

const userId = 1;

export const MessageItemList = () => {
  const [messageList] = useState<MessageProps[]>([
    {
      authorId: 2,
      content: 'Lorem ipsum dolor sit.',
      createdOn: new Date().getTime().toString(),
      groupId: 1,
      id: 1,
    },
    {
      authorId: 1,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
          accusantium molestiae, adipisci, ipsam dignissimos ipsa officia fugit,
          numquam rem suscipit aut ea eligendi! Commodi, illum tempore tenetur
          amet officiis, ipsum soluta eius ipsa recusandae inventore similique
          et non magni asperiores, necessitatibus quo! Mollitia, explicabo
          blanditiis minima dolorum quis eos perspiciatis?`,
      createdOn: new Date().getTime().toString(),
      groupId: 1,
      id: 2,
    },
    {
      authorId: 2,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
      accusaniis minima dolorum quis eos perspiciatis?`,
      createdOn: new Date().getTime().toString(),
      groupId: 1,
      id: 3,
    },
    {
      authorId: 1,
      content: `Lorem ipsum dolor os perspiciatis?`,
      createdOn: new Date().getTime().toString(),
      groupId: 1,
      id: 4,
    },
  ]);

  return (
    <ScrollArea className="h-[calc(74vh)] p-4">
      {messageList.map((message) => {
        const { authorId, id } = message;

        if (authorId === userId) {
          return <Outgoing key={id} {...message} />;
        } else {
          return <Incoming key={id} {...message} />;
        }
      })}
    </ScrollArea>
  );
};
