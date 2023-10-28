import React from 'react';

const MessagePlaceholder = () => {
  return (
    <button
      className={`flex my-2 md:my-4 mx-2 min-w-max rounded-xl cursor-pointer p-2 md:p-4 bg-gradient-to-r bg-black text-white rounded-tl-none`}
      title={'typing...'}
    >
      <span className="max-w-xs text-sm md:text-md font-semibold md:font-bold text-ellipsis overflow-hidden animate-bounce mr-1">
        .
      </span>
      <span className="max-w-xs text-sm md:text-md font-semibold md:font-bold text-ellipsis overflow-hidden animate-bounce mr-1">
        .
      </span>
      <span className="max-w-xs text-sm md:text-md font-semibold md:font-bold text-ellipsis overflow-hidden animate-bounce">
        .
      </span>
    </button>
  );
};

export default MessagePlaceholder;
