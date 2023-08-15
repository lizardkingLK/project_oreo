import React, { useState, useRef, useEffect, Fragment } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getPublicUrl, uploadFile } from "@/lib/supabase";

import { ICreatedForDataProps, IGroupProps, IMessageDataProps } from "@/types";

import {
  apiUrls,
  bucketNames,
  groupTypes,
  mediaTypes,
  messageTypes,
  sections,
  strings,
} from "@/utils/enums";

import { getRandomNumber, getTimeConverted, isDevEnv } from "@/utils/helpers";

import Layout from "@/components/layout";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import ChevronBack from "@/components/svgs/chevronBack";
import Bars from "@/components/svgs/bars";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
import Welcome from "@/components/welcome";
import AddFriend from "@/components/sections/friends/add";
import Feeds from "@/components/sections/feeds";
import Dashboard from "@/components/sections/dashboard";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Messages = () => {
  const [isDev, _] = useState(isDevEnv())
  const [navbar, setNavbar] = useState(false);
  const [groups, setGroups] = useState<IGroupProps[]>([]);
  const [group, setGroup] = useState<any>(null);
  const [section, setSection] = useState(sections.home);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [typing, setTyping] = useState<any>(false);
  const [notifs, setNotifs] = useState<null | boolean | number>(null);

  const textInputRef = useRef<null | HTMLInputElement>(null);
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  const { isLoaded, userId, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (section !== sections.group) {
      setGroup(null);
    }
  }, [section]);

  useEffect(() => setNavbar(false), [group, input]);

  useEffect(() => {
    const initializeGroups = async (userId: string) => {
      await fetch(`${apiUrls.group}?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => groupMessages(data, userId));
    };

    if (userId) {
      initializeGroups(userId);
      !isDev && initizalizeSocket();
    }
  }, [userId, isDev]);

  useEffect(() => {
    if (typing && typing.userId && groups) {
      const tempGroup = groups.find(
        (group) => group.targetId === typing.userId
      );
      if (tempGroup) {
        tempGroup.isOnline = true;
        Object.assign(groups, tempGroup);
      }
    }
  }, [typing, groups]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notifs, input, group]);

  useEffect(() => {
    if (output) {
      const tempGroupIndex = groups.findIndex(
        (group) => group.id === output.groupId
      ),
        tempGroup = groups[tempGroupIndex];
      if (tempGroup) {
        const tempGroupMessages = tempGroup.messages,
          newMessage = {
            type: messageTypes.RECEIVED,
            content: output.content,
            fromId: output.fromId,
            createdOn: getTimeConverted(),
            groupId: tempGroup.id,
            status: true,
            toId: output.toId,
          };
        tempGroupMessages[tempGroupMessages.length] = newMessage;
        Object.assign(tempGroup, {
          messages: tempGroupMessages,
          lastMessage: newMessage,
        });
        groups[tempGroupIndex] = tempGroup;
        setNotifs(Math.random());
      }
    }
  }, [output, groups]);

  const groupMessages = (messages: any[], userId: string) => {
    const groups = new Map();
    let groupId,
      group,
      tempMessages,
      target: ICreatedForDataProps,
      createdOnDate;
    messages &&
      messages.length > 0 &&
      messages.forEach((message: IMessageDataProps, _: any) => {
        groupId = message.groupId;
        createdOnDate = new Date(message.createdAt);
        Object.assign(message, {
          type:
            message.userId === userId
              ? messageTypes.SENT
              : messageTypes.RECEIVED,
          createdOn: getTimeConverted(createdOnDate),
          createdOnDate,
        });
        if (groups.has(groupId)) {
          group = groups.get(groupId);
          tempMessages = group.messages ?? [];
          tempMessages[tempMessages.length] = message;
          Object.assign(group, {
            lastMessage: message,
            messages: tempMessages,
          });
        } else {
          if (message.groupType === groupTypes.PRIVATE) {
            if (message.userId === userId) {
              target = message.createdFor[0];
            } else {
              target = message.createdFor[1];
            }
          } else if (message.groupType === groupTypes.PUBLIC) {
            // TODO: set group meta details
          }
          target &&
            groups.set(groupId, {
              id: groupId,
              name: target.firstName
                ? `${target.firstName} ${target.lastName}`
                : target.username,
              displayImage: target.displayImage,
              targetId: target.id,
              isStatus: false,
              isOnline: false,
              messages: [message],
              lastMessage: message,
            });
        }
      });
    setGroups(
      Array.from(groups.values()).sort(
        (first, second) =>
          second.lastMessage.createdOnDate - first.lastMessage.createdOnDate
      )
    );
  };

  const initizalizeSocket = async () => {
    await fetch(apiUrls.socket);
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setOutput(msg);
    });

    socket.on("is-typing", (typing) => {
      setTyping(typing);
    });
  };

  const onChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);

    socket &&
      socket.emit("is-typing", {
        value: true,
        groupId: group!.id,
        name: user?.firstName ?? strings.someone,
        userId,
      });
  };

  const sendMessage = (newMessage: {
    type: messageTypes | undefined;
    content: any;
    createdOn: any;
    groupId: any;
    status: boolean;
    fromId: string | null | undefined;
    toId: any;
  }) => {
    if (newMessage && newMessage.content && socket) {
      const tempGroup = group;

      const tempGroupMessages = tempGroup && tempGroup.messages;
      newMessage.createdOn = getTimeConverted(new Date(newMessage.createdOn));
      if (tempGroupMessages) {
        tempGroupMessages[tempGroupMessages.length] = newMessage;
      }
      Object.assign(tempGroup, {
        messages: tempGroupMessages,
        lastMessage: newMessage,
      });
      setInput("");
      setGroup(tempGroup);
      setNotifs(null);
      if (textInputRef && textInputRef.current) {
        textInputRef.current.focus();
      }
      socket.emit("is-typing", false);
      socket.emit("new-message", newMessage);
    }
  };

  const onSubmitHandler = () => {
    if (input && group) {
      sendMessage({
        type: messageTypes.SENT,
        content: input,
        createdOn: new Date().toISOString(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
      });
    }
  };

  const onMediaHandler = async (
    files: { [s: string]: any } | ArrayLike<any>
  ) => {
    if (group) {
      const newMessage = {
        type: messageTypes.SENT,
        createdOn: new Date().toISOString(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
        content: "",
      };
      if (isDev) {
        const formData = new FormData();
        Object.values(files).forEach(async (file) => {
          formData.append("file", file);
        });

        await fetch(apiUrls.file, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            newMessage.content = `[${mediaTypes.image}](${data.data})`;
            sendMessage(newMessage);
            setNotifs(Math.random());
          });
      } else {
        Object.values(files).forEach(async (file) => {
          const path = `${group.id}/${getRandomNumber()}`;
          const response = await uploadFile(
            file,
            bucketNames.attachments,
            path
          );
          if (response == null || response.error) {
            throw response.error;
          }
          const { data } = getPublicUrl(bucketNames.attachments, path);
          newMessage.content = `[${mediaTypes.image}](${data.publicUrl})`;
          sendMessage(newMessage);
          setNotifs(Math.random());
        });
      }
    }
  };

  const onSelectGroupHandler = async (groupId: string) => {
    setGroup(groups.find((g) => g.id === groupId));
    if (group && textInputRef.current && socket) {
      textInputRef.current.focus();
      socket.emit("new-window", userId);
    }
    setSection(sections.group);
  };

  const onKeyDownHandler = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  if (!isLoaded) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Spinner size={12} />
      </section>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen" id="divHome">
        <div className="absolute z-10 block md:flex items-center p-4 border-stone-900 w-full">
          <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
            {isSignedIn && (
              <button
                id="btnToggleNavbar"
                className="mr-4 md:mr-2 text-white hover:text-stone-600"
                onClick={() => setNavbar((prevState) => !prevState)}
              >
                <Bars />
              </button>
            )}
            {!navbar && (
              <h1 className="ml-4 md:ml-2 text-3xl text-center md:text-left text-white font-bold">
                OREO
              </h1>
            )}
          </div>
        </div>
        {isSignedIn ? (
          <section className="flex justify-center">
            <div className="basis-3/4 md:basis-1/4">
              {navbar ? (
                <UserNavbar
                  navbar={navbar}
                  setNavbar={setNavbar}
                  setSection={setSection}
                />
              ) : (
                <div className="mt-20">
                  <MessageLinkList
                    groups={groups}
                    setGroup={onSelectGroupHandler}
                    selectedGroup={group}
                  />
                </div>
              )}
            </div>
            <div
              className={`basis-3/4 absolute top-0 bg-black md:bg-transparent md:relative md:block container`}
            >
              {section === sections.addFriend ? (
                <div className="flex h-screen items-center justify-center w-full">
                  <AddFriend />
                </div>
              ) : section === sections.feeds ? (
                <div className="flex h-screen items-center justify-center w-full">
                  <Feeds />
                </div>
              ) : section === sections.group ? (
                group && (
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
                )
              ) : section === sections.home ? (
                <div className="hidden md:flex h-screen items-center justify-center md:md:w-full">
                  <Dashboard groups={groups} user={user} />
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <Welcome />
        )}
      </main>
    </Layout>
  );
};

export default Messages;
