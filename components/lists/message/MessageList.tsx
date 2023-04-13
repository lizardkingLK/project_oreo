import MessageCard from '@/components/cards/message';
import { IMessageListProps } from '@/types';

const MessageList = (props: IMessageListProps) => {
    if (props) {
        const { group, typing, notifs, lastMessageRef } = props;
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
                <div ref={lastMessageRef}>
                    {typing && (
                        <p className="text-sm m-8 text-gray-500">Someone is typing...</p>
                    )}
                </div>
            </>
        );
    } else return null;

};

export default MessageList