import React from 'react';

import { ISectionSwitchProps } from '@/types';

import { sections } from '@/utils/enums';

import AddFriend from '@/components/sections/friends/add';
import Dashboard from '@/components/sections/dashboard';
import Group from './group';
import Spinner from '../svgs/spinner';
import { useSection } from './store';

const SectionSwitch = (props: ISectionSwitchProps) => {
  const section = useSection((state) => state.section);

  if (props) {
    const {
      userId,
      groups,
      user,
      messages,
      group,
      setGroup,
      active,
      notifs,
      lastMessageRef,
      input,
      onChangeHandler,
      onBlurHandler,
      onKeyDownHandler,
      onEmojiHandler,
      onSubmitHandler,
      onDeleteHandler,
      onCopyHandler,
      onForwardHandler,
      onEditHandler,
      onViewHandler,
      onMediaHandler,
      onAddFriendHandler,
      onSelectGroupHandler,
      textInputRef,
      loading,
      forwardModal,
      emojiModal,
      attachmentModal,
      setForwardModal,
      setEmojiModal,
      setAttachmentModal,
      context,
      handleReadUnread,
      newMessages,
      setNewMessages,
      onClickNewMessageHandler,
    } = props;

    if (section === sections.loading) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <Spinner size={12} />
        </div>
      );
    } else if (section === sections.home) {
      return (
        <div className="flex h-screen items-center justify-center md:md:w-full">
          <Dashboard
            groups={groups}
            user={user}
            notifs={notifs}
            onSelectGroupHandler={onSelectGroupHandler}
          />
        </div>
      );
    } else if (section === sections.addFriend) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <AddFriend
            onAddFriendHandler={onAddFriendHandler}
            onSelectGroupHandler={onSelectGroupHandler}
            groups={groups}
          />
        </div>
      );
    } else if (section === sections.group && group) {
      return (
        <Group
          userId={userId}
          messages={messages}
          group={group}
          setGroup={setGroup}
          groups={groups}
          active={active}
          notifs={notifs}
          lastMessageRef={lastMessageRef}
          input={input}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          onKeyDownHandler={onKeyDownHandler}
          onEmojiHandler={onEmojiHandler}
          onSubmitHandler={onSubmitHandler}
          onMediaHandler={onMediaHandler}
          onDeleteHandler={onDeleteHandler}
          onCopyHandler={onCopyHandler}
          onForwardHandler={onForwardHandler}
          onEditHandler={onEditHandler}
          onViewHandler={onViewHandler}
          textInputRef={textInputRef}
          loading={loading}
          forwardModal={forwardModal}
          emojiModal={emojiModal}
          attachmentModal={attachmentModal}
          setForwardModal={setForwardModal}
          setEmojiModal={setEmojiModal}
          setAttachmentModal={setAttachmentModal}
          context={context}
          handleReadUnread={handleReadUnread}
          newMessages={newMessages}
          setNewMessages={setNewMessages}
          onClickNewMessageHandler={onClickNewMessageHandler}
        />
      );
    } else return null;
  } else return null;
};

export default SectionSwitch;
