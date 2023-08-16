import MessageCard from "@/components/cards/message";
import { IMessageListProps } from "@/types";
import { Fragment } from "react";

const MessageList = (props: IMessageListProps) => {
  if (props) {
    const { group, typing, lastMessageRef } = props;
    return (
      <Fragment>
        {group?.messages?.map((message, index) => (
          <Fragment key={index}>
            <MessageCard
              type={message.type}
              content={message.content}
              messageAuthorName={group.name}
              messageTime={message.createdOn}
              messageImagePath={group.displayImage}
            />
          </Fragment>
        ))}
        <div ref={lastMessageRef}></div>
        {group && typing && typing.groupId === group.id && (
          <div className="absolute bottom-12 m-8 z-10">
            <p className="text-sm text-stone-500">{`${typing.name} is typing...`}</p>
          </div>
        )}
      </Fragment>
    );
  } else return null;
};

export default MessageList;
