import Close from "@/components/svgs/close";
import Pencil from "@/components/svgs/pencil";
import Spinner from "@/components/svgs/spinner";
import { IMessageMenuProps } from "@/types";
import React from "react";

const MessageMenu = (props: IMessageMenuProps) => {
  if (props) {
    const { referenceId, options, onDeleteHandler, loading, messageTime } =
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
                title="Edit Message?"
                className="text-black bg-gradient-to-r from-stone-300 to-stone-400 hover:bg-gradient-to-r font-black rounded-full text-sm text-center w-full p-2"
              >
                <Pencil />
              </button>
            </li>
            <li>
              <button
                id={`${referenceId}`}
                type="button"
                title="Delete Message?"
                className="text-black bg-gradient-to-r from-stone-300 to-stone-400 hover:bg-gradient-to-r font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => onDeleteHandler(referenceId)}
              >
                {loading ? <Spinner size={8} /> : <Close size={8} />}
              </button>
            </li>
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default MessageMenu;
