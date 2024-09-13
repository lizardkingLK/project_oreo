import { create } from 'zustand';

type ChatScreenEditorState = {
  content: string;
  handleContentChange: (content: string) => void;
};

export const useChatScreenEditorStore = create<ChatScreenEditorState>(
  (set) => ({
    content: '',
    handleContentChange: (content: string) =>
      set({
        content,
      }),
  })
);
