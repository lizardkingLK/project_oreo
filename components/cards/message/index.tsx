import React from 'react';
import Avatar from '@/components/avatar';
import { messageTypes } from "@/utils/enums";
import { IMessageCardProps } from "@/types";
import MessageMedia from '@/components/media/message';
import VerticalEllipsis from '@/components/svgs/ellipsis/vertical';

export default function MessageCard(props: IMessageCardProps) {
  if (props) {
    const { type, messageAuthorName, messageTime, messageImagePath, content } = props;
    return (
      <div className={`flex ${type === messageTypes.SENT && 'justify-end'}`}>
        {messageAuthorName && messageTime && messageImagePath && type === messageTypes.RECEIVED
          ? <div className='hidden md:flex flex-col justify-start items-center mt-4'>
            <Avatar
              name={messageAuthorName}
              imagePath={messageImagePath}
              size={60}
            />
          </div>
          : null}
        <div title={messageTime} className={`p-4 my-4 min-w-max rounded-xl bg-gradient-to-r 
        ${type === messageTypes.RECEIVED
            ? 'from-green-400 ml-2 to-green-500 rounded-tl-none cursor-pointer'
            : 'from-orange-400 to-orange-500 rounded-tr-none cursor-pointer text-right'}`}>
          <MessageMedia content={content} />
        </div>
        {type === messageTypes.SENT && (
          <button className='flex h-min mt-4 text-gray-900 hover:text-gray-100' title='Message Options'>
            <VerticalEllipsis />
          </button>
        )}
      </div >
    );
  } else return null;
}
