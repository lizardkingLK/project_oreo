import MessageEditor from '@/components/forms/message';
import MessageList from '@/components/lists/message/MessageList';
import ChevronBack from '@/components/svgs/chevronBack';
import { IGroupSectionProps } from '@/types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getRelativeTime, resolveValue } from '@/utils/helpers';
import { useSection } from '../store';
import { sections } from '@/utils/enums';
import { useScrollLock } from '@/components/lists/message/store';

const Group = (props: IGroupSectionProps) => {
  const setScrollLock = useScrollLock((state) => state.setScrollLock);

  const setSection = useSection((state) => state.setSection);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [maxScroll, setMaxScroll] = useState<number>(0);

  useEffect(() => {
    const current = scrollRef.current,
      handler = () => {
        const scroll = current?.scrollTop ?? 0,
          lockable = maxScroll < scroll;
        setMaxScroll((prev) => resolveValue(lockable, scroll, prev));
        setScrollLock(scroll > maxScroll - 240);
      };
    current?.addEventListener('scroll', handler);
    return () => current?.removeEventListener('scroll', handler);
  }, [maxScroll, scrollRef, setScrollLock]);

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
      forwardModal,
      emojiModal,
      attachmentModal,
      setForwardModal,
      setEmojiModal,
      setAttachmentModal,
      context,
      newMessages,
      setNewMessages,
      onClickNewMessageHandler,
    } = props;

    return (
      <Fragment>
        <div className="p-4 flex justify-between items-center sticky top-0 bg-stone-300 z-10">
          <div className={'basis-8/12'}>
            <h1 className="flex text-md md:text-2xl text-black font-bold">
              <span>{group.name}</span>
            </h1>
            {group.isOnline ? (
              <h1 className="text-sm md:text-md font-bold text-green-500">
                Online
              </h1>
            ) : (
              group.lastMessage && (
                <h1 className="text-sm md:text-md font-bold text-black">
                  {getRelativeTime(group.lastMessage.createdOn)}
                </h1>
              )
            )}
          </div>
          <button
            className="text-black hover:text-green-500"
            title="Home"
            onClick={() => {
              setGroup(null);
              setSection(sections.home);
            }}
          >
            <ChevronBack />
          </button>
        </div>
        <div
          className="md:ml-4 overflow-scroll h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]"
          id="divMessageList"
          ref={scrollRef}
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
            newMessages={newMessages}
            setNewMessages={setNewMessages}
            onClickNewMessageHandler={onClickNewMessageHandler}
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
