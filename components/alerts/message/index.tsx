import IconButton from '@/components/buttons/iconButton';
import { IModalProps } from '@/types';
import React from 'react';

const MessageAlert = (props: IModalProps) => {
  const { modal, handleClose, options } = props,
    { newMessages } = options;
  if (modal) {
    return (
      <IconButton
        color={'bg-green-400'}
        width={'w-8'}
        height={'h-8'}
        text={'text-white'}
        font={'font-bold'}
        clickEvent={handleClose}
        title={`${newMessages} new message(s)`}
      >
        {newMessages}
      </IconButton>
    );
  } else return null;
};

export default MessageAlert;
