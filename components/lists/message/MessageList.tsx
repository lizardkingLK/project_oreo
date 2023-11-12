import MessageCard from '@/components/cards/message';
import { IGroupProps, IMessageListProps } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import MessagePlaceholder from '@/components/placeholder/message';
import ForwardModal from '@/components/modals/forward';
import MessageAlert from '@/components/alerts/message';

const MessageList = (props: IMessageListProps) => {
  const {
    group,
    groups,
    newMessages,
    setNewMessages,
    onClickNewMessageHandler,
  } = props;

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
        <div className="absolute top-1/2 left-full -translate-x-full -translate-y-full z-10 transition-opacity delay-150">
          <MessageAlert
            modal={Number(newMessages) > 0}
            handleClose={() => onClickNewMessageHandler()}
            options={{
              newMessages,
              setNewMessages,
            }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
          <ForwardModal
            modal={forwardModal}
            handleClose={() => setForwardModal(false)}
            options={{
              forwardableGroups,
              onForwardHandler,
              group,
              active,
              userId,
            }}
          />
        </div>
        {group &&
          messages?.map((message, _) => (
            <MessageCard
              key={message.referenceId}
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
          ))}
        {active?.groupId === group?.id && <MessagePlaceholder />}
        <div ref={lastMessageRef} className="mb-60"></div>
      </Fragment>
    );
  } else return null;
};

export default MessageList;
