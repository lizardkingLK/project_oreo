import React from 'react';

const Forward = ({ size }: { size: number | undefined }) => {
  const className = size ? `w-${size} h-${size}` : 'w-8 h-8';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
      />
    </svg>
  );
};

export default Forward;
