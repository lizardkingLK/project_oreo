import React, { useEffect, useState } from 'react';
import Avatar from '@/components/avatar';
import { IMessageLinkProps } from '@/types';
import {
  classNames,
  getBriefContent,
  getRelativeTime,
  getTimeConverted,
  isImage,
  resolveValue,
} from '@/utils/helpers';
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
      handleReadUnread,
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
              handleReadUnread={handleReadUnread}
            />
          </div>
        ) : (
          <button
            className="cursor-pointer min-w-full select-none"
            title={messageAuthorName ?? ''}
            onClick={() => messageOnClick(messageId, strings.groupId)}
            onDoubleClick={handleOpenGroupOptions}
          >
            <div
              className={classNames(
                'flex justify-center items-start py-4 rounded-xl',
                resolveValue(messageIsActive, 'bg-stone-300', null)
              )}
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
                  className={classNames(
                    'text-md md:text-xl truncate max-w-xs text-left',
                    resolveValue(
                      messageIsActive,
                      'bg-black text-white delay-75',
                      'text-black'
                    )
                  )}
                >
                  {messageAuthorName}
                </h1>
                <p
                  className={
                    'text-sm md:text-md text-stone-700 truncate max-w-xs text-left'
                  }
                >
                  {resolveValue(
                    active?.groupId === messageId && active?.value,
                    <span className="text-green-500 font-bold animate-pulse">
                      typing...
                    </span>,
                    <span
                      className={classNames(
                        resolveValue(
                          messageContentIsActive,
                          'text-green-500 font-bold',
                          ''
                        )
                      )}
                      title={resolveValue(
                        isImage(messageContent),
                        'Image',
                        messageContent
                      )}
                    >
                      {getBriefContent(messageContent)}
                    </span>
                  )}
                </p>
              </div>
              <div className="basis-1/4 flex flex-col justify-between items-end">
                {messageTime &&
                  resolveValue(
                    messageUnread,
                    <p className="mx-2 w-6 h-6 text-xs bg-green-300 text-black font-bold flex justify-center items-center rounded-full">
                      {messageUnread}
                    </p>,
                    <p
                      className="mx-2 text-xs md:text-md text-black font-bold"
                      title={getRelativeTime(messageTime)}
                    >
                      {getTimeConverted(messageTime)}
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
