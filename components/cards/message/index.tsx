import React from 'react';
import Avatar from '@/components/avatar';
import { messageTypes } from "@/utils/enums";
import { IMessageCardProps } from "@/types";

export default function MessageCard(props: IMessageCardProps) {
  if (props) {
    const parentContainerClass = `flex ${props.type === messageTypes.SENT && 'justify-end'}`;
    const containerClass = `p-4 m-4 min-w-max rounded-xl bg-gradient-to-r 
    ${props.type === messageTypes.RECEIVED
        ? 'from-green-400 to-green-500 rounded-tl-none cursor-pointer'
        : 'from-orange-400 to-orange-500 rounded-tr-none cursor-pointer'}`;
    const contentClass = `max-w-xs text-md text-black font-bold ${props.type === messageTypes.SENT && 'text-right'}`;

    return (
      <div className={parentContainerClass}>
        {props.type === messageTypes.RECEIVED && props.messageAuthorName && props.messageTime && props.messageImagePath
          ? <div className='hidden md:flex flex-col justify-start items-center mt-4'>
            <Avatar
              name={props.messageAuthorName}
              imagePath={props.messageImagePath}
              size={60}
            />
            <p className='text-sm text-white ml-2'>{props.messageTime}</p>
          </div>
          : null}
        <div className={containerClass}>
          <h1 className={contentClass}>
            {props.content}
          </h1>
        </div>
      </div>
    );
  } else return null;
}
