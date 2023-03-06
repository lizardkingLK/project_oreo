import Avatar from '@/components/avatar'
import Link from 'next/link'
import React from 'react'

interface IMessageLinkProps {
    messageLink: string,
    messageImagePath: string,
    messageAuthorType: number,
    messageAuthorIsStatus: boolean,
    messageAuthorIsOnline: boolean,
    messageAuthorName: string,
    messageContent: string,
    messageTime: string,
}

const MessageLink = (props: IMessageLinkProps) => {
    if (props) {
        return (
            <Link href={props.messageLink} title={props.messageAuthorName}>
                <div className="flex items-start mt-4 p-4 hover:bg-gray-900">
                    <Avatar
                        name={props.messageAuthorName}
                        imagePath={props.messageImagePath}
                        size={60}
                        isStatus={props.messageAuthorIsStatus}
                    />
                    <div className="basis-2/4 ml-4 font-bold truncate">
                        <h1 className="text-xl text-white">{props.messageAuthorName}</h1>
                        <p className="text-sm text-gray-500">{props.messageContent}</p>
                    </div>
                    <div className="basis-1/4 flex justify-end">
                        <p className="text-md text-white font-bold">{props.messageTime}</p>
                    </div>
                </div>
            </Link>
        );
    } else return null;
}

export default MessageLink