import React from 'react';
import UserNavbar from '../navs/user';
import MessageLinkList from '../lists/message/MessageLinkList';
import { ISidebarProps } from '@/types';
import { useNavbar } from '../navs/user/store';

const SidebarSwitch = (props: ISidebarProps) => {
  const navbar = useNavbar((state) => state.navbar);
  const {
    className,
    setSection,
    newUser,
    groups,
    onSelectGroupHandler,
    group,
    active,
    userId,
    handleReadUnread,
  } = props;
  console.log(navbar);

  if (navbar) {
    return (
      <div className={className}>
        <UserNavbar setSection={setSection} newUser={newUser} />
      </div>
    );
  } else {
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
  }
};

export default SidebarSwitch;
