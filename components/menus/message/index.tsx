import { IMessageMenuProps } from "@/types";
import React from "react";

const MessageMenu = (props: IMessageMenuProps) => {
  if (props) {
    const { referenceId, options, onDeleteHandler } = props;

    if (options) {
      return (
        <ul className="rounded-xl">
          <li className="ml-2 mt-2">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            >
              Edit
            </button>
          </li>
          <li className="ml-2 mt-2">
            <button
              id={`${referenceId}`}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center w-full"
              onClick={onDeleteHandler}
            >
              <span>Delete</span>
            </button>
          </li>
        </ul>
      );
    } else return null;
  } else return null;
};

export default MessageMenu;
