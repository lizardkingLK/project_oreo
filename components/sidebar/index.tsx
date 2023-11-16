import React from 'react';
import MessageLinkList from '../lists/message/MessageLinkList';
import { ISidebarProps } from '@/types';

const SidebarSwitch = (props: ISidebarProps) => {
  const {
    className,
    groups,
    onSelectGroupHandler,
    group,
    active,
    userId,
    handleReadUnread,
  } = props;

  return (
    <div className={className}>
      <MessageLinkList
        groups={groups}
        onGroupClickHandler={onSelectGroupHandler}
        selectedGroup={group}
        active={active}
        userId={userId}
        requireOptions={true}
        handleReadUnread={handleReadUnread}
      />
    </div>
  );
};

export default SidebarSwitch;
