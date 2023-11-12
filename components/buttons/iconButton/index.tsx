import { IIconButtonProps } from '@/types';
import { classNames } from '@/utils/helpers';
import React from 'react';

const IconButton = (props: IIconButtonProps) => {
  const { children, color, width, height, text, font, title, clickEvent } =
    props;
  if (children) {
    return (
      <button
        title={title}
        className={classNames(color, width, height, text, font, 'rounded-full')}
        onClick={clickEvent}
      >
        {children}
      </button>
    );
  } else return null;
};

export default IconButton;
