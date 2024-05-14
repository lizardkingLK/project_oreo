import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';
import { create } from 'zustand';
import MessagesScreen, { MessageState } from '../../screens/messages';

export interface GroupState {
  // TODO: separate domain (types) and view models (interface)
  id: number;
  name: string;
  description: string;
  profilePicture: string | StaticImport;
  type: number;
  email?: string | null;
  unread?: number | null;
  isActiveGroup?: boolean | null;
  messages?: MessageState[] | null;
  // TODO: unreadMessages array = if unread is not null and > 0
  //    selected group loads + spinner and displays new messages
  // TODO: messages array = initially loads last 10 messages only
}

interface GroupScreenState {
  group: GroupState | null;
  setGroup: ({ group }: { group: GroupState | undefined }) => void;
}

export const useGroup = create<GroupScreenState>((set) => ({
  group: null,
  setGroup: (state) => set(() => ({ group: state.group })),
}));

const GroupLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3">
      <MessagesScreen />
      {children}
    </div>
  );
};

export default GroupLayout;
