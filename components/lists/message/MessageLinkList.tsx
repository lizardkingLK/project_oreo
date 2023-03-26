import MessageLink from '@/components/links/message';
import React from 'react'

interface IMessageProps {
  type: number;
  content: string;
  authorId: number;
  createdOn: string;
  groupId: number;
}

interface IGroupProps {
  id: number;
  name: string;
  displayImage: string;
  isStatus: boolean;
  isOnline: boolean;
  messages: Array<IMessageProps>;
  lastMessage: IMessageProps;
}

interface IMessageLinkListProps {
  groups: Array<IGroupProps>;
  setGroup: Function;
  selectedGroup: IGroupProps;
}

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