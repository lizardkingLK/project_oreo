import React from 'react';

import Bin from '@/components/svgs/Bin';
import Copy from '@/components/svgs/copy';
import Pencil from '@/components/svgs/pencil';
import Spinner from '@/components/svgs/spinner';

import { IMessageMenuProps } from '@/types';
import Picture from '@/components/svgs/picture';
import Forward from '@/components/svgs/forward';
import { strings } from '@/utils/enums';

const MessageMenu = (props: IMessageMenuProps) => {
  if (props) {
    const {
      referenceId,
      options,
      setOptions,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onViewHandler,
      loading,
      messageTime,
      isImage,
      setForward,
    } = props;

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
                title="Forward Message"
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => {
                  setForward((prev: boolean) => !prev);
                  onForwardHandler(referenceId, strings.referenceId);
                  setOptions(false);
                }}
              >
                <Forward size={6} />
              </button>
            </li>
            <li className="pr-2">
              <button
                type="button"
                title="Copy Message"
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => {
                  onCopyHandler(referenceId);
                  setOptions(false);
                }}
              >
                <Copy size={6} />
              </button>
            </li>
            {isImage && (
              <li className="pr-2">
                <button
                  type="button"
                  title="View Image"
                  className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                  onClick={() => {
                    onViewHandler(referenceId);
                    setOptions(false);
                  }}
                >
                  <Picture size={6} />
                </button>
              </li>
            )}
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
