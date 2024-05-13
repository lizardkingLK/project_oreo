import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';

export interface GroupState {
  id: number;
  name: string;
  description: string;
  profilePicture: string | StaticImport;
  email: string;
  unread: number | null;
  // TODO: unreadMessages array = if unread is not null and > 0
  //    selected group loads + spinner and displays new messages
  // TODO: messages array = initially loads last 10 messages only
}

const Group = () => {
  return <div>Group</div>;
};

export default Group;
