import React from 'react'
import Avatar from '@/components/avatar'
import { IMessageLinkProps } from '@/utils/types';

const MessageLink = (props: IMessageLinkProps) => {
    if (props) {
        const activeState = props.messageIsActive ? "bg-gray-900" : null;
        return (
            <a href={void (0)} className="cursor-pointer" title={props.messageAuthorName}
                onClick={() => props.messageOnClick(props.messageId)}>
                <div className={`flex items-start mb-4 py-4 px-2 rounded-md max-w-sm md:max-w-xs hover:bg-gray-800 ${activeState}`}>
                    <Avatar
                        name={props.messageAuthorName}
                        imagePath={props.messageImagePath}
                        size={props.messageImageSize}
                        isStatus={props.messageAuthorIsStatus}
                    />
                    <div className="basis-2/4 ml-4 font-bold truncate">
                        <h1 className="text-xl text-white">{props.messageAuthorName}</h1>
                        <p className="text-sm text-gray-500">{props.messageContent}</p>
                    </div>
                    <div className="basis-1/4 flex justify-end items-center">
                        <p className="ml-2 text-md text-white font-bold">{props.messageTime}</p>
                    </div>
                </div>
            </a>
        );
    } else return null;
}

export default MessageLink