import Bin from "@/components/svgs/Bin";
import Close from "@/components/svgs/close";
import Pencil from "@/components/svgs/pencil";
import Spinner from "@/components/svgs/spinner";
import { IMessageMenuProps } from "@/types";
import React from "react";

const MessageMenu = (props: IMessageMenuProps) => {
  if (props) {
    const { referenceId, options, onDeleteHandler, loading, messageTime, setOptions } =
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
                <Pencil />
              </button>
            </li>
            <li className="pr-2">
              <button
                id={`${referenceId}`}
                type="button"
                title="Delete Message"
                className="text-red-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => onDeleteHandler(referenceId)}
              >
                {loading ? <Spinner size={8} /> : <Bin size={8} />}
              </button>
            </li>
            <li>
              <button
                id={`${referenceId}`}
                type="button"
                title="Close"
                className="text-white font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => setOptions(false)}
              >
                <Close size={8} />
              </button>
            </li>
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default MessageMenu;
