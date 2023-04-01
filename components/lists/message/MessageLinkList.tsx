import React from 'react'
import MessageLink from '@/components/links/message';
import { IMessageLinkListProps } from '@/utils/types';

const MessageLinkList = (props: IMessageLinkListProps) => {
  if (props) {
    const { groups, setGroup, selectedGroup } = props;
    return (
      groups &&
      groups.map((group, index) => (
        <MessageLink
          key={index}
          messageId={group.id}
          messageOnClick={setGroup}
          messageImagePath={group.displayImage}
          messageImageSize={60}
          messageAuthorName={group.name}
          messageContent={group.lastMessage.content}
          messageTime={group.lastMessage.createdOn}
          messageAuthorType={0}
          messageAuthorIsStatus={group.isStatus}
          messageIsActive={selectedGroup && selectedGroup.id === group.id} messageLink={''} />
      ))
    );
  } else return null;
};

export default MessageLinkList