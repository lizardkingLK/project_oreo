import Avatar from '@/components/avatar'
import React from 'react'

interface IMessageLinkProps {
    messageId: number,
    messageLink: string,
    messageImagePath: string,
    messageImageSize: number,
    messageAuthorType: number,
    messageAuthorIsStatus: boolean,
    messageAuthorName: string,
    messageContent: string,
    messageTime: string,
    messageIsActive: boolean,
    messageOnClick: Function,
}

const MessageLink = (props: IMessageLinkProps) => {
    if (props) {
        const activeState = props.messageIsActive ? "bg-gray-900" : null;
        return (
            <a href={void (0)} className="cursor-pointer" title={props.messageAuthorName}
                onClick={() => props.messageOnClick(props.messageId)}>
                <div className={`flex items-start mt-4 p-4 max-w-sm hover:bg-gray-800 ${activeState}`}>
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