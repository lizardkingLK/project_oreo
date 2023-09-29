import MarkAsRead from '@/components/svgs/markAsRead';
import { IGroupMenuProps } from '@/types';
import React from 'react';

const GroupMenu = (props: IGroupMenuProps) => {
  if (props) {
    const { options, name } = props;
    if (options) {
      return (
        <div className="flex justify-between items-center py-4 mb-4 pl-4 border-solid border-stone-400 border-2 rounded-xl">
          <h1 className="text-sm font-medium rounded-lg p-2 mr-2 bg-black text-white">
            {name}
          </h1>
          <ul className="rounded-xl flex justify-end items-center">
            {/* {!isImage && (
                  <li className="pr-2">
                    <button
                      type="button"
                      title="Edit Message"
                      className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                      onClick={() => {
                        onEditHandler(referenceId);
                        setOptions(false);
                      }}
                    >
                      <Pencil size={6} />
                    </button>
                  </li>
                )} */}
            <li className="pr-2">
              <button
                type="button"
                title="Mark As Read"
                className="text-green-500 font-black rounded-full text-sm text-center w-full p-2"
                onClick={() => {
                  console.log(true);

                  //   setForward((prev: boolean) => !prev);
                  //   onForwardHandler(referenceId, strings.referenceId);
                  //   setOptions(false);
                }}
              >
                <MarkAsRead size={6} />
              </button>
            </li>
            {/* <li className="pr-2">
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
                </li> */}
            {/* {isImage && (
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
                )} */}
            {/* <li className="pr-2">
                  <button
                    type="button"
                    title="Remove Message"
                    className="text-red-500 font-black rounded-full text-sm text-center w-full p-2"
                    onClick={() => onDeleteHandler(referenceId)}
                  >
                    {loading ? <Spinner size={6} /> : <Bin size={6} />}
                  </button>
                </li> */}
          </ul>
        </div>
      );
    } else return null;
  } else return null;
};

export default GroupMenu;
