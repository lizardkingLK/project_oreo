'use client';

import React from 'react';
import { MessageItemList } from './messageItemList';
import { ChatScreenHeader } from './chatScreenHeader';
import { ChatScreenEditor } from './chatScreenEditor';

export const ChatScreenSection = () => {
  return (
    <section
      className={
        'h-[calc(94vh)] w-[calc(100vw)]'
      }
    >
      <ChatScreenHeader />
      <MessageItemList />
      <ChatScreenEditor />
    </section>
  );
};
