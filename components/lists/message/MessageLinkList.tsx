import React, { Fragment, useState } from 'react';
import MessageLink from '@/components/links/message';
import { IMessageLinkListProps } from '@/types';

const MessageLinkList = (props: IMessageLinkListProps) => {
  const [currentMenuId, setCurrentMenuId] = useState<null | string>(null);

  if (props) {
    const {
      groups,
      onGroupClickHandler,
      selectedGroup,
      active,
      userId,
      requireOptions,
      handleReadUnread,
    } = props;

    return (
      <Fragment>
        {groups?.map((group) => {
          return (
            <MessageLink
              key={group.id}
              messageId={group.id}
              messageOnClick={onGroupClickHandler}
              messageImagePath={group.displayImage}
              messageImageSize={60}
              messageAuthorName={group.name}
              messageContent={group.lastMessage?.content}
              messageContentIsActive={
                group.unreadCount > 0 && group.lastMessage?.userId !== userId
              }
              messageTime={group.lastMessage?.createdOn}
              messageAuthorIsStatus={group.isStatus}
              messageAuthorIsOnline={group.isOnline}
              messageIsActive={selectedGroup && selectedGroup.id === group.id}
              messageUnread={group.unreadCount}
              active={active}
              requireOptions={requireOptions}
              currentMenuId={currentMenuId}
              setCurrentMenuId={setCurrentMenuId}
              handleReadUnread={handleReadUnread}
            />
          );
        })}
      </Fragment>
    );
  } else return null;
};

export default MessageLinkList;
