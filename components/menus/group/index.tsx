import MarkAsRead from '@/components/svgs/markAsRead';
import MarkAsUnread from '@/components/svgs/markAsUnread';
import { IGroupMenuProps } from '@/types';
import React from 'react';

const GroupMenu = (props: IGroupMenuProps) => {
  if (props) {
    const { options, name, isUnread } = props;
    if (options) {
      return (
        <div className="flex justify-between items-center py-4 mb-4 pl-4 border-solid border-stone-400 border-2 rounded-xl">
          <h1 className="text-sm font-medium rounded-lg p-2 mr-2 bg-stone-300 text-black">
            {name}
          </h1>
          <ul className="rounded-xl flex justify-end items-center">
            <li className="pr-2">
              <button
                type="button"
                title={`Mark As ${isUnread ? 'Read' : 'Unread'}`}
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => {
                  console.log(true);
                }}
              >
                {isUnread ? <MarkAsRead size={6} /> : <MarkAsUnread size={6} />}
              </button>
            </li>
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default GroupMenu;
