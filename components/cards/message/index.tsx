import React, { useEffect, useState } from 'react';
import { messageTypes } from '@/utils/enums';
import { IMessageCardProps } from '@/types';
import MessageMedia from '@/components/media/message';
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
      messageTime,
      content,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onEditHandler,
      onViewHandler,
      loading,
      setForwardModal,
      setCurrentMenuId,
    } = props;

    const handleOpenMessageOptions = () => {
      setCurrentMenuId(referenceId);
      setOptions((prev) => !prev);
    };

    return (
      <div className={`flex ${type === messageTypes.SENT && 'justify-end'}`}>
        {options ? (
          <div className="mt-6">
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
              setForwardModal={setForwardModal}
            />
          </div>
        ) : (
          <button
            className={`my-2 md:my-4 mx-2 min-w-max rounded-xl cursor-pointer ${
              isImage(content)
                ? 'bg-transparent'
                : 'p-2 md:p-4 bg-gradient-to-r'
            } ${
              type === messageTypes.RECEIVED
                ? 'bg-black text-white rounded-tl-none'
                : 'bg-white text-black rounded-tr-none'
            }`}
            title={new Date(Number(messageTime)).toLocaleTimeString()}
            onClick={() =>
              type === messageTypes.SENT && handleOpenMessageOptions()
            }
          >
            <MessageMedia content={content} />
          </button>
        )}
        {type === messageTypes.SENT && options && (
          <button
            className="flex h-min mt-8 text-white hover:text-white bg-black rounded-full"
            title="Close Message Options"
            onClick={() => setOptions((prev) => !prev)}
          >
            <Close size={6} />
          </button>
        )}
      </div>
    );
  } else return null;
}
