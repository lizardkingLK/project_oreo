import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';
import { useChatScreenEditorStore } from './state';
import { MessageProps } from '../../types';
import { useGroupListStore } from '../../state';

export const ChatScreenEditor = () => {
  const textAreaRef = useRef(null)

  const { activeGroup, updateMessages } = useGroupListStore((state) => state);

  const { content, handleContentChange } = useChatScreenEditorStore(
    (state) => state
  );

  const handleSend = () => {
    if (!content || activeGroup === null) {
      return;
    }

    const newMessage: MessageProps = {
      authorId: 1,
      content,
      createdOn: new Date().getTime().toString(),
      groupId: activeGroup.id,
      id: 5,
    };

    updateMessages(newMessage);

    handleContentChange('');
  };

  if (!activeGroup) {
    return null;
  }

  return (
    <div className="mx-4 flex h-[calc(10vh)] items-center space-x-4">
      <Textarea
      ref={textAreaRef}
        className="h-full w-full resize-none bg-transparent"
        placeholder="Type your message here."
        defaultValue={content}
        onChange={(event) => handleContentChange(event.target.value)}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-full min-w-[calc(10vh)] bg-transparent"
        onClick={handleSend}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
