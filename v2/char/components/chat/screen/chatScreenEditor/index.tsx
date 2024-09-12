import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';

export const ChatScreenEditor = () => {
  return (
    <div className="mx-4 flex h-[calc(10vh)] items-center space-x-4">
      <Textarea
        className="h-full w-full resize-none bg-transparent"
        placeholder="Type your message here."
      />
      <Button
        variant="outline"
        size="icon"
        className="h-full min-w-[calc(10vh)] bg-transparent"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
