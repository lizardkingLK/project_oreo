import React, { useEffect, useState } from 'react';
import Avatar from '@/components/avatar';
import { IMessageLinkProps } from '@/types';
import { getBriefContent, isImage } from '@/utils/helpers';
import { strings } from '@/utils/enums';
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
              requireOptions={requireOptions}
              setOptions={setOptions}
            />
          </div>
        ) : (
          <button
            className="cursor-pointer min-w-full"
            title={messageAuthorName ?? ''}
            onClick={() => messageOnClick(messageId, strings.groupId)}
            onDoubleClick={handleOpenGroupOptions}
          >
            <div
              className={`flex justify-center items-start py-4 rounded-xl ${
                messageIsActive ? 'bg-stone-300' : null
              }`}
            >
              <Avatar
                name={messageAuthorName!}
                imagePath={messageImagePath}
                size={messageImageSize}
                isStatus={messageAuthorIsStatus}
                isOnline={messageAuthorIsOnline}
              />
              <div className="basis-2/4 ml-4 font-normal truncate">
                <h1
                  className={`${
                    messageIsActive ? 'bg-black text-white' : 'text-black'
                  } text-md md:text-xl truncate max-w-xs text-left`}
                >
                  {messageAuthorName}
                </h1>
                <p
                  className={
                    'text-sm md:text-md text-stone-700 truncate max-w-xs text-left'
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
          </button>
        )}
      </div>
    );
  } else return null;
};

export default MessageLink;
