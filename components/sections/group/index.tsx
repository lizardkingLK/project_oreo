import MessageEditor from "@/components/forms/message";
import MessageList from "@/components/lists/message/MessageList";
import ChevronBack from "@/components/svgs/chevronBack";
import { IGroupSectionProps } from "@/types";
import React, { Fragment } from "react";

const Group = (props: IGroupSectionProps) => {
  if (props) {
    const {
      messages,
      group,
      setGroup,
      active,
      notifs,
      lastMessageRef,
      input,
      onChangeHandler,
      onKeyDownHandler,
      onSubmitHandler,
      onDeleteHandler,
      onMediaHandler,
      textInputRef,
      loading,
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
          <div className="basis-8/12">
            <h1 className="flex text-2xl text-white font-bold">
              <span>{group.name}</span>
            </h1>
            {group.isOnline ? (
              <h1 className="text-md font-bold text-green-500">Online</h1>
            ) : (
              <h1 className="text-md font-bold text-white">
                {group.lastMessage?.createdOn}
              </h1>
            )}
          </div>
        </div>
        <div
          className="overflow-scroll h-[calc(100vh-12rem)]"
          id="divMessageList"
        >
          <MessageList
            messages={messages}
            group={group}
            active={active}
            notifs={notifs}
            lastMessageRef={lastMessageRef}
            onDeleteHandler={onDeleteHandler}
            loading={loading}
          />
        </div>
        <div className="sticky bottom-0 p-4 bg-black">
          <MessageEditor
            group={group}
            input={input}
            onChangeHandler={onChangeHandler}
            onKeyDownHandler={onKeyDownHandler}
            onSubmitHandler={onSubmitHandler}
            textInputRef={textInputRef}
            onMediaHandler={onMediaHandler}
          />
        </div>
      </Fragment>
    );
  } else return null;
};

export default Group;
