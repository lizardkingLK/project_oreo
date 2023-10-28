import Close from '@/components/svgs/close';
import MarkAsRead from '@/components/svgs/markAsRead';
import MarkAsUnread from '@/components/svgs/markAsUnread';
import { IGroupMenuProps } from '@/types';
import React from 'react';

const GroupMenu = (props: IGroupMenuProps) => {
  if (props) {
    const {
      groupId,
      name,
      options,
      isUnread,
      requireOptions,
      setOptions,
      handleReadUnread,
    } = props;

    if (options) {
      return (
        <div className="flex justify-between items-center bg-stone-200 rounded-xl py-4 mb-4">
          <h1 className="text-md font-medium text-lg rounded-lg p-2 ml-4 text-black">
            {name}
          </h1>
          <ul className="rounded-xl flex justify-end items-center">
            <li className="pr-2">
              <button
                type="button"
                title={`Mark As ${isUnread ? 'Read' : 'Unread'}`}
                className="text-black font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => {
                  handleReadUnread(groupId, isUnread);
                  setOptions(false);
                }}
              >
                {isUnread ? <MarkAsRead size={6} /> : <MarkAsUnread size={6} />}
              </button>
            </li>
            <li className="mr-6">
              {requireOptions && options && (
                <button
                  className="flex h-min text-black font-black"
                  title="Close Group Options"
                  onClick={() => setOptions((prev: boolean) => !prev)}
                >
                  <Close size={6} thicness={2} />
                </button>
              )}
            </li>
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default GroupMenu;
