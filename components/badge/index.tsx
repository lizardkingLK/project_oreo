import React from 'react';
import { IBadgeProps } from '@/types';

const Badge = (props: IBadgeProps) => {
  const { text, tooltip } = props;
  return (
    <span
      title={tooltip}
      className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
    >
      {text}
    </span>
  );
};

export default Badge;
