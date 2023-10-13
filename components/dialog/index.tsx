import React from 'react';
import Close from '../svgs/close';
import { IDialogProps } from '@/types';

const Dialog = (props: IDialogProps) => {
  if (props) {
    const {
      dialogTitle,
      dialogSubtitle,
      dialogCloseTitle,
      dialogCloseHandler,
      children,
    } = props;
    return (
      <div
        className={`rounded-2xl bg-gradient-to-r from-stone-400 to-stone-500 shadow-stone-500 shadow-2xl w-full mb-4`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="hidden md:block text-black text-md md:text-xl font-bold">
            {dialogTitle}
          </h1>
          <h1 className="block md:hidden text-black text-md md:text-xl font-bold">
            {dialogSubtitle}
          </h1>
          <button
            className="text-black"
            title={dialogCloseTitle}
            onClick={dialogCloseHandler}
          >
            <Close size={6} />
          </button>
        </div>
        {children}
      </div>
    );
  } else return null;
};

export default Dialog;
