import React from "react";

import { ISecitonSwitchProps } from "@/types";

import { sections } from "@/utils/enums";

import AddFriend from "@/components/sections/friends/add";
import Feeds from "@/components/sections/feeds";
import Dashboard from "@/components/sections/dashboard";
import Group from "./group";

const SectionSwitch = (props: ISecitonSwitchProps) => {
  if (props) {
    const {
      section,
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
      onMediaHandler,
      textInputRef,
      loading,
    } = props;

    if (section === sections.addFriend) {
      return (
        <div className="flex h-screen items-center justify-center w-full">
          <AddFriend />
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
          messages={messages}
          group={group}
          setGroup={setGroup}
          active={active}
          notifs={notifs}
          lastMessageRef={lastMessageRef}
          input={input}
          onChangeHandler={onChangeHandler}
          onKeyDownHandler={onKeyDownHandler}
          onSubmitHandler={onSubmitHandler}
          onMediaHandler={onMediaHandler}
          onDeleteHandler={onDeleteHandler}
          textInputRef={textInputRef}
          loading={loading}
        />
      );
    } else if (section === sections.home) {
      return (
        <div className="hidden md:flex h-screen items-center justify-center md:md:w-full">
          <Dashboard groups={groups} user={user} />
        </div>
      );
    } else return null;
  } else return null;
};

export default SectionSwitch;
