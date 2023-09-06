import MessageCard from "@/components/cards/message";
import { IMessageListProps } from "@/types";
import { Fragment } from "react";

const MessageList = (props: IMessageListProps) => {
  if (props) {
    const { messages, group, active, lastMessageRef, onDeleteHandler, onCopyHandler, loading } = props;
    return (
      <Fragment>
        {group &&
          messages?.map((message, _) => (
            <Fragment key={message.referenceId}>
              <MessageCard
                referenceId={message.referenceId}
                type={message.type}
                content={message.content}
                messageAuthorName={group.name}
                messageTime={message.createdOn}
                messageImagePath={group.displayImage}
                onDeleteHandler={onDeleteHandler}
                onCopyHandler={onCopyHandler}
                loading={loading}
              />
            </Fragment>
          ))}
        <div ref={lastMessageRef}></div>
        {active?.groupId === group?.id && (
          <div className="absolute bottom-12 m-8 z-10">
            <p className="text-sm text-stone-500">{`${active.name} is typing...`}</p>
          </div>
        )}
      </Fragment>
    );
  } else return null;
};

export default MessageList;
