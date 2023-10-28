import MessageCard from '@/components/cards/message';
import Dialog from '@/components/dialog';
import { IGroupProps, IMessageListProps } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import MessageLinkList from './MessageLinkList';
import MessagePlaceholder from '@/components/placeholder/message';

const MessageList = (props: IMessageListProps) => {
  const { group, groups } = props;

  const [currentMenuId, setCurrentMenuId] = useState<null | string>(null);
  const [forwardableGroups, setForwardableGroups] = useState<IGroupProps[]>([]);

  useEffect(() => {
    setForwardableGroups(groups?.filter((g) => g.id !== group?.id));
  }, [group, groups]);

  if (props) {
    const {
      messages,
      userId,
      group,
      active,
      lastMessageRef,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onEditHandler,
      onViewHandler,
      loading,
      forwardModal,
      setForwardModal,
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
                onEditHandler={onEditHandler}
                onViewHandler={onViewHandler}
                loading={loading}
                setForwardModal={setForwardModal}
                setCurrentMenuId={setCurrentMenuId}
                currentMenuId={currentMenuId}
              />
            </Fragment>
          ))}
        {active?.groupId === group?.id && <MessagePlaceholder />}
        <div ref={lastMessageRef}></div>
        {forwardModal && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
            <Dialog
              dialogTitle={'Forward Message'}
              dialogSubtitle={'Forward'}
              dialogCloseTitle={'Cancel Forward Message'}
              dialogCloseHandler={() => setForwardModal(false)}
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
          </div>
        )}
      </Fragment>
    );
  } else return null;
};

export default MessageList;
