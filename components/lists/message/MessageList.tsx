import MessageCard from '@/components/cards/message';
import Dialog from '@/components/dialog';
import { IGroupProps, IMessageListProps } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import MessageLinkList from './MessageLinkList';

const MessageList = (props: IMessageListProps) => {
  const { group, groups } = props;

  const [currentMenuId, setCurrentMenuId] = useState<null | string>(null);
  const [forwarableGroups, setForwardableGroups] = useState<IGroupProps[]>([]);

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
      forward,
      setForward,
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
                setForward={setForward}
                setCurrentMenuId={setCurrentMenuId}
                currentMenuId={currentMenuId}
              />
            </Fragment>
          ))}
        <div ref={lastMessageRef}></div>
        {active?.groupId === group?.id && (
          <div className="absolute bottom-5 md:bottom-12 m-8 z-10">
            <p className="text-xs text-stone-500">{`${active.name} is typing...`}</p>
          </div>
        )}
        {forward && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
            <Dialog
              dialogTitle={'Forward Message'}
              dialogSubtitle={'Forward'}
              dialogCloseTitle={'Cancel Forward Message'}
              dialogCloseHandler={() => setForward(false)}
            >
              <div className="py-4 m-4">
                {forwarableGroups.length > 0 ? (
                  <MessageLinkList
                    groups={forwarableGroups}
                    onGroupClickHandler={onForwardHandler}
                    onEditHandler={onEditHandler}
                    selectedGroup={group}
                    active={active}
                    userId={userId}
                  />
                ) : (
                  <h1 className="text-md text-white text-center">
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
