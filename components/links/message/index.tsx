import React from 'react';
import Avatar from '@/components/avatar';
import { IMessageLinkProps } from '@/types';
import { getBriefContent, isImage } from '@/utils/helpers';
import { strings } from '@/utils/enums';
import VerticalEllipsis from '@/components/svgs/ellipsis/vertical';

const MessageLink = (props: IMessageLinkProps) => {
  if (props) {
    const {
      messageId,
      messageOnClick,
      messageAuthorName,
      messageImagePath,
      messageImageSize,
      messageIsActive,
      messageAuthorIsStatus,
      messageAuthorIsOnline,
      messageContent,
      messageContentIsActive,
      messageTime,
      messageUnread,
      active,
    } = props;

    return (
      <div className="flex">
        <a
          href={void 0}
          className="cursor-pointer min-w-full"
          title={messageAuthorName ?? ''}
          onClick={() => messageOnClick(messageId, strings.groupId)}
        >
          <div
            className={`flex justify-center items-start mb-4 py-4 rounded-2xl hover:bg-stone-800 ${
              messageIsActive ? 'bg-stone-900' : null
            }`}
          >
            <Avatar
              name={messageAuthorName!}
              imagePath={messageImagePath}
              size={messageImageSize}
              isStatus={messageAuthorIsStatus}
              isOnline={messageAuthorIsOnline}
            />
            <div className="basis-2/4 ml-4 font-bold truncate">
              <h1 className="text-md md:text-xl text-white truncate max-w-xs">
                {messageAuthorName}
              </h1>
              <p
                className={
                  'text-sm md:text-md text-stone-500 truncate max-w-xs'
                }
              >
                {active?.groupId === messageId && active?.value ? (
                  <span className="text-green-500">typing...</span>
                ) : (
                  <span
                    className={messageContentIsActive ? 'text-green-500' : ''}
                    title={isImage(messageContent) ? 'Image' : messageContent}
                  >
                    {getBriefContent(messageContent)}
                  </span>
                )}
              </p>
            </div>
            <div className="basis-1/4 flex flex-col justify-between items-end">
              {messageUnread ? (
                <p className="mx-2 w-6 h-6 text-xs bg-green-300 text-black font-bold flex justify-center items-center rounded-full">
                  {messageUnread}
                </p>
              ) : (
                <p className="mx-2 text-xs md:text-md text-white font-bold">
                  {messageTime}
                </p>
              )}
            </div>
          </div>
        </a>
        <button
          className="flex h-min z-10 text-stone-900 hover:text-stone-100"
          title="Message Options"
          onClick={() => console.log(true)}
        >
          <VerticalEllipsis />
        </button>
      </div>
    );
  } else return null;
};

export default MessageLink;
