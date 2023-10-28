import React from 'react';

const Close = ({
  size,
  thicness = 1.5,
}: {
  size: number | undefined;
  thicness?: number;
}) => {
  const className = size ? `w-${size} h-${size}` : 'w-8 h-8';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={thicness}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default Close;
