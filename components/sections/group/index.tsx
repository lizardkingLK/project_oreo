import MessageEditor from '@/components/forms/message';
import MessageList from '@/components/lists/message/MessageList';
import ChevronBack from '@/components/svgs/chevronBack';
import { IGroupSectionProps } from '@/types';
import React, { Fragment } from 'react';

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
      forward,
      setForward,
      context,
    } = props;
    return (
      <Fragment>
        <div className="p-4 flex items-center sticky top-0 bg-black z-10">
          <button
            className="block md:hidden text-white hover:text-green-500 basis-1/12 mr-4"
            onClick={() => setGroup(null)}
          >
            <ChevronBack />
          </button>
          <div className={`basis-8/12 ${navbar ? 'collapse' : 'visible'}`}>
            <h1 className="flex text-md md:text-2xl text-white font-bold">
              <span>{group.name}</span>
            </h1>
            {group.isOnline ? (
              <h1 className="text-sm md:text-md font-bold text-green-500">
                Online
              </h1>
            ) : (
              <h1 className="text-sm md:text-md font-bold text-white">
                {group.lastMessage?.createdOn}
              </h1>
            )}
          </div>
        </div>
        <div
          className="md:ml-8 overflow-scroll h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]"
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
            forward={forward}
            setForward={setForward}
          />
        </div>
        <div className="sticky bottom-0 p-2 md:p-4 bg-black">
          <MessageEditor
            group={group}
            input={input}
            onChangeHandler={onChangeHandler}
            onBlurHandler={onBlurHandler}
            onKeyDownHandler={onKeyDownHandler}
            onSubmitHandler={onSubmitHandler}
            onMediaHandler={onMediaHandler}
            textInputRef={textInputRef}
            context={context}
          />
        </div>
      </Fragment>
    );
  } else return null;
};

export default Group;
