import React from 'react';

import { ISecitonSwitchProps } from '@/types';

import { sections } from '@/utils/enums';

import AddFriend from '@/components/sections/friends/add';
import Feeds from '@/components/sections/feeds';
import Dashboard from '@/components/sections/dashboard';
import Group from './group';
import Spinner from '../svgs/spinner';
import Introduction from './introduction';

const SectionSwitch = (props: ISecitonSwitchProps) => {
  if (props) {
    const {
      userId,
      section,
      setSection,
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
      onKeyDownHandler,
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
      navbar,
      forward,
      setForward,
    } = props;

    if (section === sections.loading) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <Spinner size={12} />
        </div>
      );
    } else if (section === sections.introduction) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <Introduction
            groups={groups}
            user={user}
            setSection={setSection}
            onSelectGroupHandler={onSelectGroupHandler}
          />
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
    } else if (section === sections.feeds) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <Feeds />
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
          onKeyDownHandler={onKeyDownHandler}
          onSubmitHandler={onSubmitHandler}
          onMediaHandler={onMediaHandler}
          onDeleteHandler={onDeleteHandler}
          onCopyHandler={onCopyHandler}
          onForwardHandler={onForwardHandler}
          onEditHandler={onEditHandler}
          onViewHandler={onViewHandler}
          textInputRef={textInputRef}
          loading={loading}
          navbar={navbar}
          forward={forward}
          setForward={setForward}
        />
      );
    } else return null;
  } else return null;
};

export default SectionSwitch;
