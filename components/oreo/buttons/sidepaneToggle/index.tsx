import React, { Fragment } from 'react';
import { useSidePane } from '../../sidepane';

export const OptionsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

const SidePaneToggleButton = () => {
  const { sidepane, toggle } = useSidePane();

  return (
    <Fragment>
      <button
        type="button"
        className="me-2 inline-flex items-center rounded-full bg-green-700 p-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => toggle({ sidepane: !sidepane })}
      >
        <OptionsIcon />
        <span className="sr-only">Icon description</span>
      </button>
    </Fragment>
  );
};

export default SidePaneToggleButton;
