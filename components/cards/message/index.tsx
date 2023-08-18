import React, { useState } from "react";
import Avatar from "@/components/avatar";
import { messageTypes } from "@/utils/enums";
import { IMessageCardProps } from "@/types";
import MessageMedia from "@/components/media/message";
import VerticalEllipsis from "@/components/svgs/ellipsis/vertical";
import MessageMenu from "@/components/menus/message";

export default function MessageCard(props: IMessageCardProps) {
  const [options, setOptions] = useState(false);

  if (props) {
    const {
      referenceId,
      type,
      messageAuthorName,
      messageTime,
      messageImagePath,
      content,
      onDeleteHandler,
    } = props;

    return (
      <div className={`flex ${type === messageTypes.SENT && "justify-end"}`}>
        {messageAuthorName &&
        messageTime &&
        messageImagePath &&
        type === messageTypes.RECEIVED ? (
          <div className="hidden md:flex flex-col justify-start items-center mt-4">
            <Avatar
              name={messageAuthorName}
              imagePath={messageImagePath}
              size={60}
            />
          </div>
        ) : null}
        <div
          title={messageTime}
          className={`p-4 my-4 min-w-max rounded-xl bg-gradient-to-r 
        ${
          type === messageTypes.RECEIVED
            ? "from-green-400 ml-2 to-green-500 rounded-tl-none cursor-pointer"
            : "from-stone-400 to-stone-500 rounded-tr-none cursor-pointer text-right"
        }`}
        >
          <MessageMedia content={content} />
          <MessageMenu
            referenceId={referenceId}
            options={options}
            onDeleteHandler={onDeleteHandler}
          />
        </div>
        {type === messageTypes.SENT && (
          <button
            className="flex h-min mt-4 text-stone-900 hover:text-stone-100"
            title="Message Options"
            onClick={() => setOptions((prev) => !prev)}
          >
            <VerticalEllipsis />
          </button>
        )}
      </div>
    );
  } else return null;
}
