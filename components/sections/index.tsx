import React, { Fragment, LegacyRef, ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

import { IGroupProps } from "@/types";

import { sections } from "@/utils/enums";

import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import ChevronBack from "@/components/svgs/chevronBack";
import AddFriend from "@/components/sections/friends/add";
import Feeds from "@/components/sections/feeds";
import Dashboard from "@/components/sections/dashboard";

const SectionSwitch = (props: {
    section: sections,
    setGroup: Function,
    group: IGroupProps,
    typing: any,
    notifs: null | boolean | number,
    input: string,
    lastMessageRef: null | LegacyRef<HTMLDivElement>,
    onChangeHandler: ChangeEventHandler<HTMLInputElement>,
    onKeyDownHandler: KeyboardEventHandler<HTMLInputElement>,
    onSubmitHandler: MouseEventHandler<HTMLButtonElement>,
    onMediaHandler: Function,
    textInputRef: LegacyRef<HTMLInputElement> | null,
    groups: IGroupProps[],
    user: any,
}) => {
    if (props) {
        const {
            section,
            setGroup,
            group,
            groups,
            user,
            typing,
            notifs,
            lastMessageRef,
            input,
            onChangeHandler,
            onKeyDownHandler,
            onSubmitHandler,
            onMediaHandler,
            textInputRef
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
        } else if (section === sections.group) {
            return (
                <Fragment>
                    <div className="p-4 flex items-center sticky top-0 bg-black z-10">
                        <button
                            className="block md:hidden text-white hover:text-green-500 basis-1/12 mr-4"
                            onClick={() => setGroup(null)}
                        >
                            <ChevronBack />
                        </button>
                        <div className="basis-8/12">
                            <h1 className="flex text-2xl text-white font-bold">
                                <span>{group.name}</span>
                            </h1>
                            {group.isOnline ? (
                                <h1 className="text-md font-bold text-green-500">
                                    Online
                                </h1>
                            ) : (
                                <h1 className="text-md font-bold text-white">
                                    {group.lastMessage.createdOn}
                                </h1>
                            )}
                        </div>
                    </div>
                    <div
                        className="overflow-scroll h-[calc(100vh-12rem)]"
                        id="divMessageList"
                    >
                        <MessageList
                            group={group}
                            typing={typing}
                            notifs={notifs}
                            lastMessageRef={lastMessageRef}
                        />
                    </div>
                    <div className="sticky bottom-0 p-4 bg-black">
                        <MessageEditor
                            group={group}
                            input={input}
                            onChangeHandler={onChangeHandler}
                            onKeyDownHandler={onKeyDownHandler}
                            onSubmitHandler={onSubmitHandler}
                            textInputRef={textInputRef}
                            onMediaHandler={onMediaHandler}
                        />
                    </div>
                </Fragment>
            );
        } else if (section === sections.home) {
            return (
                <div className="hidden md:flex h-screen items-center justify-center md:md:w-full">
                    <Dashboard groups={groups} user={user} />
                </div>
            );
        } else return null;
    } else return null;
}

export default SectionSwitch;