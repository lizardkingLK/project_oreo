import React from 'react';

const DateStepper = ({ dateString }: { dateString: string }) => {
  if (!dateString) {
    return null;
  }

  return (
    <ol className="flex w-full items-center justify-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
      <li>
        {dateString.split(',').map((date, i) => (
          <span key={i}>{date}</span>
        ))}
      </li>
    </ol>
  );
};

export default DateStepper;
