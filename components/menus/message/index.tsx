import React from "react";

import Bin from "@/components/svgs/Bin";
import Copy from "@/components/svgs/copy";
import Pencil from "@/components/svgs/pencil";
import Spinner from "@/components/svgs/spinner";

import { IMessageMenuProps } from "@/types";

const MessageMenu = (props: IMessageMenuProps) => {
  if (props) {
    const { referenceId, options, onDeleteHandler, onCopyHandler, loading, messageTime } =
      props;

    if (options) {
      return (
        <div className="flex justify-between items-center pt-2">
          <h1 className="text-sm font-medium rounded-lg px-2 mr-2 bg-black text-white">
            You at {messageTime}
          </h1>
          <ul className="rounded-xl flex justify-end items-center">
            <li className="pr-2">
              <button
                type="button"
                title="Edit Message"
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
              >
                <Pencil size={6} />
              </button>
            </li>
            <li className="pr-2">
              <button
                type="button"
                title="Copy Message"
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => onCopyHandler(referenceId)}
              >
                <Copy size={6} />
              </button>
            </li>
            <li className="pr-2">
              <button
                type="button"
                title="Remove Message"
                className="text-red-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => onDeleteHandler(referenceId)}
              >
                {loading ? <Spinner size={6} /> : <Bin size={6} />}
              </button>
            </li>
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default MessageMenu;
