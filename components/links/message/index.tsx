import React from "react";
import Avatar from "@/components/avatar";
import { IMessageLinkProps } from "@/types";
import { getBriefContent } from "@/utils/helpers";

const MessageLink = (props: IMessageLinkProps) => {
  if (props) {
    const {
      messageOnClick,
      messageAuthorName,
      messageId,
      messageImagePath,
      messageImageSize,
      messageIsActive,
      messageAuthorIsStatus,
      messageAuthorIsOnline,
      messageContent,
      messageTime,
      messageUnread,
    } = props;
    return (
      <a
        href={void(0)}
        className="cursor-pointer"
        title={messageAuthorName}
        onClick={() => messageOnClick(messageId)}
      >
        <div
          className={`flex justify-center items-start mb-4 py-4 rounded-2xl hover:bg-stone-800 ${
            messageIsActive ? "bg-stone-900" : null
          }`}
        >
          <Avatar
            name={messageAuthorName}
            imagePath={messageImagePath}
            size={messageImageSize}
            isStatus={messageAuthorIsStatus}
            isOnline={messageAuthorIsOnline}
          />
          <div className="basis-2/4 ml-4 font-bold truncate">
            <h1 className="text-xl text-white truncate max-w-xs">
              {messageAuthorName}
            </h1>
            <p className={"text-sm text-stone-500 truncate max-w-xs"}>
              {getBriefContent(messageContent)}
            </p>
          </div>
          <div className="basis-1/4 flex flex-col justify-between items-end">
            {messageUnread ? (
              <p className="ml-2 w-6 h-6 text-xs bg-green-300 text-black font-bold flex justify-center items-center rounded-full">
                {messageUnread}
              </p>
            ) : (
              <p className="ml-2 text-md text-white font-bold">{messageTime}</p>
            )}
          </div>
        </div>
      </a>
    );
  } else return null;
};

export default MessageLink;
