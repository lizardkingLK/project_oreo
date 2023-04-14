import React from 'react'
import Avatar from '@/components/avatar'
import { IMessageLinkProps } from '@/types';

const MessageLink = (props: IMessageLinkProps) => {
    if (props) {
        const {
            messageOnClick,
            messageAuthorName,
            messageId,
            messageImagePath,
            messageImageSize,
            messageIsActive,
            messageAuthorIsStatus,
            messageAuthorIsOnline,
            messageContent,
            messageTime,
            messageUnread,
        } = props;
        return (
            <a href={void (0)} className="cursor-pointer" title={messageAuthorName}
                onClick={() => messageOnClick(messageId)}>
                <div className={`flex items-start mb-4 py-4 px-2 rounded-md max-w-sm md:max-w-xs hover:bg-gray-800
                ${messageIsActive
                        ? "bg-gray-900"
                        : null
                    }`}>
                    <Avatar
                        name={messageAuthorName}
                        imagePath={messageImagePath}
                        size={messageImageSize}
                        isStatus={messageAuthorIsStatus}
                        isOnline={messageAuthorIsOnline}
                    />
                    <div className="basis-2/4 ml-4 font-bold truncate">
                        <h1 className="text-xl text-white">{messageAuthorName}</h1>
                        <p className="text-sm text-gray-500">
                            {messageContent}
                        </p>
                    </div>
                    <div className="basis-1/4 flex flex-col justify-between items-end">
                        {messageUnread ? (
                            <p className="ml-2 w-6 h-6 text-xs bg-green-300 text-black font-bold flex justify-center items-center rounded-full">{messageUnread}</p>
                        ) : (
                            <p className="ml-2 text-md text-white font-bold">{messageTime}</p>
                        )}
                    </div>
                </div>
            </a>
        );
    } else return null;
}

export default MessageLink