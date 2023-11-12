import Dialog from '@/components/dialog';
import MessageLinkList from '@/components/lists/message/MessageLinkList';
import { IModalProps } from '@/types';
import React from 'react';

const ForwardModal = (props: IModalProps) => {
  const { modal, handleClose, options } = props,
    { forwardableGroups, onForwardHandler, group, active, userId } = options;
  if (modal) {
    return (
      <Dialog
        dialogTitle={'Forward Message'}
        dialogSubtitle={'Forward'}
        dialogCloseTitle={'Cancel Forward Message'}
        dialogCloseHandler={handleClose}
      >
        <div className="py-4 m-4">
          {forwardableGroups.length > 0 ? (
            <MessageLinkList
              groups={forwardableGroups}
              onGroupClickHandler={onForwardHandler}
              selectedGroup={group}
              active={active}
              userId={userId}
              requireOptions={false}
              handleReadUnread={() => null}
            />
          ) : (
            <h1 className="text-md text-black text-center">
              You have no other groups
            </h1>
          )}
        </div>
      </Dialog>
    );
  } else return null;
};

export default ForwardModal;
