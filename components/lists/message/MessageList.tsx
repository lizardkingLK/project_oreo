import MessageCard from '@/components/cards/message';
import Dialog from '@/components/dialog';
import { IMessageListProps } from '@/types';
import { Fragment, useState } from 'react';
import MessageLinkList from './MessageLinkList';

const MessageList = (props: IMessageListProps) => {
  const [forwardModal, setForwardModal] = useState(false);

  if (props) {
    const {
      messages,
      userId,
      group,
      groups,
      active,
      lastMessageRef,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onViewHandler,
      loading,
    } = props;
    return (
      <Fragment>
        {group &&
          messages?.map((message, _) => (
            <Fragment key={message.referenceId}>
              <MessageCard
                referenceId={message.referenceId}
                type={message.type}
                content={message.content}
                messageAuthorName={group.name}
                messageTime={message.createdOn}
                messageImagePath={group.displayImage}
                onDeleteHandler={onDeleteHandler}
                onCopyHandler={onCopyHandler}
                onForwardHandler={onForwardHandler}
                onViewHandler={onViewHandler}
                loading={loading}
                setForwardModal={setForwardModal}
              />
            </Fragment>
          ))}
        <div ref={lastMessageRef}></div>
        {active?.groupId === group?.id && (
          <div className="absolute bottom-12 m-8 z-10">
            <p className="text-sm text-stone-500">{`${active.name} is typing...`}</p>
          </div>
        )}
        {forwardModal && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
            <Dialog
              dialogTitle={'Forward Message'}
              dialogSubtitle={'Forward'}
              dialogCloseTitle={'Cancel Forward Message'}
              dialogCloseHandler={() => setForwardModal(false)}
            >
              <div className="flex justify-center items-center m-4">
                <MessageLinkList
                  groups={groups}
                  onGroupClickHandler={onForwardHandler}
                  selectedGroup={group}
                  active={active}
                  userId={userId}
                />
              </div>
            </Dialog>
          </div>
        )}
      </Fragment>
    );
  } else return null;
};

export default MessageList;
