import React, { Fragment } from "react";
import MessageLink from "@/components/links/message";
import { IMessageLinkListProps } from "@/types";

const MessageLinkList = (props: IMessageLinkListProps) => {
  if (props) {
    const { groups, setGroup, selectedGroup, active } = props;
    return (
      <Fragment>
        {groups &&
          groups.map((group, index) => {
            return (
              <MessageLink
                key={index}
                messageId={group.id}
                messageOnClick={setGroup}
                messageImagePath={group.displayImage}
                messageImageSize={60}
                messageAuthorName={group.name}
                messageContent={group.lastMessage?.content}
                messageTime={group.lastMessage?.createdOn}
                messageAuthorIsStatus={group.isStatus}
                messageAuthorIsOnline={group.isOnline}
                messageIsActive={selectedGroup && selectedGroup.id === group.id}
                messageUnread={group.unreadCount}
                active={active}
              />
            );
          })}
      </Fragment>
    );
  } else return null;
};

export default MessageLinkList;
