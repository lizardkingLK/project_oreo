import React from 'react';

const UnreadStepper = (props: { unread: number }) => {
  const { unread } = props;

  return (
    <ol className="flex w-full items-center justify-center text-center text-sm font-medium text-green-500 dark:text-green-400 sm:text-base">
      <li className="after:border-1 before:border-1 flex items-center before:mx-6 before:hidden before:h-1 before:w-full before:border-b before:border-green-200 before:content-[''] after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-green-200 after:content-[''] dark:before:border-green-700 dark:after:border-green-700 sm:before:inline-block sm:after:inline-block md:w-full xl:before:mx-10 xl:after:mx-10">
        <span className="flex items-center after:mx-2 after:text-green-200 dark:after:text-green-500">
          <span className="sm:inline-flex">{unread} Unread Message(s)</span>
        </span>
      </li>
    </ol>
  );
};

export default UnreadStepper;
