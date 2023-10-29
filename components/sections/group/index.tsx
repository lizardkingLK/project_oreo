import MessageEditor from '@/components/forms/message';
import MessageList from '@/components/lists/message/MessageList';
import ChevronBack from '@/components/svgs/chevronBack';
import { IGroupSectionProps } from '@/types';
import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getRelativeTime } from '@/utils/helpers';

dayjs.extend(relativeTime);

const Group = (props: IGroupSectionProps) => {
  if (props) {
    const {
      userId,
      messages,
      group,
      groups,
      setGroup,
      active,
      notifs,
      lastMessageRef,
      input,
      onChangeHandler,
      onBlurHandler,
      onKeyDownHandler,
      onEmojiHandler,
      onSubmitHandler,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onEditHandler,
      onViewHandler,
      onMediaHandler,
      textInputRef,
      loading,
      navbar,
      forwardModal,
      emojiModal,
      attachmentModal,
      setForwardModal,
      setEmojiModal,
      setAttachmentModal,
      context,
    } = props;

    return (
      <Fragment>
        <div className="p-4 flex items-center sticky top-0 bg-stone-300 z-10">
          <button
            className="block md:hidden text-black hover:text-green-500 basis-1/12 mr-4"
            onClick={() => setGroup(null)}
          >
            <ChevronBack />
          </button>
          <div className={`basis-8/12 ${navbar ? 'collapse' : 'visible'}`}>
            <h1 className="flex text-md md:text-2xl text-black font-bold">
              <span>{group.name}</span>
            </h1>
            {group.isOnline ? (
              <h1 className="text-sm md:text-md font-bold text-green-500">
                Online
              </h1>
            ) : (
              <h1 className="text-sm md:text-md font-bold text-black">
                {getRelativeTime(group.lastMessage?.createdOn)}
              </h1>
            )}
          </div>
        </div>
        <div
          className="md:ml-4 overflow-scroll h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]"
          id="divMessageList"
        >
          <MessageList
            messages={messages}
            group={group}
            active={active}
            notifs={notifs}
            lastMessageRef={lastMessageRef}
            onDeleteHandler={onDeleteHandler}
            onCopyHandler={onCopyHandler}
            onForwardHandler={onForwardHandler}
            onEditHandler={onEditHandler}
            onGroupClickHandler={onForwardHandler}
            onViewHandler={onViewHandler}
            loading={loading}
            groups={groups}
            userId={userId}
            forwardModal={forwardModal}
            setForwardModal={setForwardModal}
          />
        </div>
        <div className="sticky bottom-0 p-2 md:p-4 bg-stone-300">
          <MessageEditor
            group={group}
            input={input}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            onKeyDownHandler={onKeyDownHandler}
            onEmojiHandler={onEmojiHandler}
            onSubmitHandler={onSubmitHandler}
            onMediaHandler={onMediaHandler}
            textInputRef={textInputRef}
            context={context}
            emojiModal={emojiModal}
            attachmentModal={attachmentModal}
            setEmojiModal={setEmojiModal}
            setAttachmentModal={setAttachmentModal}
          />
        </div>
      </Fragment>
    );
  } else return null;
};

export default Group;
