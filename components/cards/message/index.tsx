import React, { useEffect, useState } from 'react';
import Avatar from '@/components/avatar';
import { messageTypes } from '@/utils/enums';
import { IMessageCardProps } from '@/types';
import MessageMedia from '@/components/media/message';
import VerticalEllipsis from '@/components/svgs/ellipsis/vertical';
import MessageMenu from '@/components/menus/message';
import Close from '@/components/svgs/close';
import { isImage } from '@/utils/helpers';

export default function MessageCard(props: IMessageCardProps) {
  const [options, setOptions] = useState(false);

  const { currentMenuId, setCurrentMenuId, referenceId } = props;

  useEffect(() => {
    if (currentMenuId && currentMenuId !== referenceId) {
      setOptions(false);
    }
  }, [currentMenuId, referenceId, setCurrentMenuId]);

  if (props) {
    const {
      referenceId,
      type,
      messageAuthorName,
      messageTime,
      messageImagePath,
      content,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onEditHandler,
      onViewHandler,
      loading,
      setForward,
      setCurrentMenuId,
    } = props;

    const handleOpenMessageOptions = () => {
      setCurrentMenuId(referenceId);
      setOptions((prev) => !prev);
    };

    return (
      <div className={`flex ${type === messageTypes.SENT && 'justify-end'}`}>
        {messageAuthorName && type === messageTypes.RECEIVED ? (
          <div className="hidden md:flex flex-col justify-start items-center mt-4">
            <Avatar
              name={messageAuthorName}
              imagePath={messageImagePath}
              size={60}
            />
          </div>
        ) : null}
        {options ? (
          <MessageMenu
            messageTime={messageTime}
            referenceId={referenceId}
            options={options}
            setOptions={setOptions}
            onDeleteHandler={onDeleteHandler}
            onCopyHandler={onCopyHandler}
            onForwardHandler={onForwardHandler}
            onEditHandler={onEditHandler}
            onViewHandler={onViewHandler}
            loading={loading}
            isImage={isImage(content)}
            setForward={setForward}
          />
        ) : (
          <div
            title={messageTime}
            className={`my-2 md:my-4 min-w-max rounded-lg md:rounded-xl ${
              isImage(content)
                ? 'bg-transparent'
                : 'p-2 md:p-4 bg-gradient-to-r'
            } ${
              type === messageTypes.RECEIVED
                ? 'from-green-400 ml-2 to-green-500 rounded-tl-none cursor-pointer'
                : 'from-stone-400 to-stone-500 rounded-tr-none cursor-pointer text-right'
            }`}
          >
            <MessageMedia content={content} />
          </div>
        )}
        {type === messageTypes.SENT &&
          (options ? (
            <button
              className="flex h-min mt-4 text-stone-100 hover:text-stone-100"
              title="Close Message Options"
              onClick={() => setOptions((prev) => !prev)}
            >
              <Close size={6} />
            </button>
          ) : (
            <button
              className="flex h-min mt-4 text-stone-900 hover:text-stone-100"
              title="Message Options"
              onClick={handleOpenMessageOptions}
            >
              <VerticalEllipsis />
            </button>
          ))}
      </div>
    );
  } else return null;
}
