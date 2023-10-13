import React, { useEffect, useState } from 'react';
import Avatar from '@/components/avatar';
import { IMessageLinkProps } from '@/types';
import { getBriefContent, isImage } from '@/utils/helpers';
import { strings } from '@/utils/enums';
import VerticalEllipsis from '@/components/svgs/ellipsis/vertical';
import Close from '@/components/svgs/close';
import GroupMenu from '@/components/menus/group';

const MessageLink = (props: IMessageLinkProps) => {
  const { currentMenuId, messageId } = props;

  const [options, setOptions] = useState(false);

  useEffect(() => {
    if (currentMenuId && currentMenuId !== messageId) {
      setOptions(false);
    }
  }, [currentMenuId, messageId]);

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
      requireOptions,
      setCurrentMenuId,
    } = props;

    const handleOpenGroupOptions = () => {
      setCurrentMenuId(messageId);
      setOptions((prev) => !prev);
    };

    return (
      <div className="flex items-center">
        {options ? (
          <div className="min-w-full">
            <GroupMenu
              name={messageAuthorName}
              groupId={messageId}
              options={options}
              isUnread={messageUnread > 0}
            />
          </div>
        ) : (
          <a
            href={void 0}
            className="cursor-pointer min-w-full"
            title={messageAuthorName ?? ''}
            onClick={() => messageOnClick(messageId, strings.groupId)}
          >
            <div
              className={`flex justify-center items-start mb-4 py-4 rounded-2xl hover:bg-stone-400 ${
                messageIsActive ? 'bg-stone-400' : null
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
                <h1 className="text-md md:text-xl text-black truncate max-w-xs">
                  {messageAuthorName}
                </h1>
                <p
                  className={
                    'text-sm md:text-md text-stone-700 truncate max-w-xs'
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
                  <p className="mx-2 text-xs md:text-md text-black font-bold">
                    {messageTime}
                  </p>
                )}
              </div>
            </div>
          </a>
        )}
        {requireOptions && (
          <div className="mx-2 mb-4 z-10">
            {options ? (
              <button
                className="flex h-min text-stone-100"
                title="Close Group Options"
                onClick={() => setOptions((prev) => !prev)}
              >
                <Close size={6} />
              </button>
            ) : (
              <button
                className="flex h-min text-stone-900 hover:text-white"
                title="Group Options"
                onClick={handleOpenGroupOptions}
              >
                <VerticalEllipsis />
              </button>
            )}
          </div>
        )}
      </div>
    );
  } else return null;
};

export default MessageLink;
