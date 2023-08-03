import MessageCard from "@/components/cards/message";
import { IMessageListProps } from "@/types";

const MessageList = (props: IMessageListProps) => {
  if (props) {
    const { group, typing, lastMessageRef } = props;
    return (
      <>
        {group &&
          group.messages &&
          group.messages.map((message, index) => (
            <MessageCard
              key={index}
              type={message.type}
              content={message.content}
              messageAuthorName={group.name}
              messageTime={message.createdOn}
              messageImagePath={group.displayImage}
            />
          ))}
        <div ref={lastMessageRef}></div>
        {typing && typing.groupId === group.id && (
          <div className="absolute bottom-12 m-8 z-10">
            <p className="text-sm text-stone-500">{`${typing.name} is typing...`}</p>
          </div>
        )}
      </>
    );
  } else return null;
};

export default MessageList;
