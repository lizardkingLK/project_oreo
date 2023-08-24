import React, { useState, useRef, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getPublicUrl, uploadFile } from "@/lib/supabase";

import {
  ICreatedForDataProps,
  IGroupProps,
  IMessageDataProps,
  IMessageProps,
} from "@/types";

import {
  apiUrls,
  bucketNames,
  groupTypes,
  mediaTypes,
  messageTypes,
  sections,
  strings,
} from "@/utils/enums";

import {
  getMessageType,
  getNameOfUser,
  getRandomNumber,
  getTimeConverted,
  isLocalStorage,
} from "@/utils/helpers";

import Layout from "@/components/layout";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import Bars from "@/components/svgs/bars";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
import Welcome from "@/components/welcome";
import SectionSwitch from "@/components/sections";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Messages = () => {
  const [storeLocally, _] = useState(isLocalStorage());
  const [navbar, setNavbar] = useState(false);
  const [groups, setGroups] = useState<IGroupProps[]>([]);
  const [group, setGroup] = useState<any>(null);
  const [section, setSection] = useState(sections.home);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [active, setActive] = useState<any>(false);
  const [notifs, setNotifs] = useState<null | boolean | string>(null);
  const [messages, setMessages] = useState<IMessageProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<null | {
    referenceId: string;
    groupId: string;
  }>(null);
  const [friend, setFriend] = useState<null | IMessageDataProps>(null);

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
      initizalizeSocket();
    }
  }, [userId]);

  useEffect(() => {
    const tempGroup = groups?.find(
      (group) => group.targetId === active?.userId
    );
    if (tempGroup) {
      tempGroup.isOnline = true;
      Object.assign(groups, tempGroup);
    }
  }, [active, groups]);

  useEffect(
    () => lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" }),
    [notifs, input, group]
  );

  useEffect(() => {
    if (output) {
      const tempGroupIndex = groups.findIndex(
          (group) => group.id === output.groupId
        ),
        tempGroup = groups[tempGroupIndex];
      if (tempGroup) {
        const tempGroupMessages = tempGroup.messages,
          newMessage = {
            id: output.id,
            referenceId: output.referenceId,
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
        setMessages(tempGroupMessages);
        setNotifs(getRandomNumber());
      }
    }
  }, [output, groups]);

  useEffect(() => {
    if (deleted) {
      const { referenceId, groupId } = deleted;
      let tempMessages;
      const tempGroups = groups;
      tempGroups.forEach((group) => {
        if (group?.id === groupId) {
          tempMessages = group?.messages?.filter(
            (g) => g.referenceId !== referenceId
          );
          group.messages = tempMessages;
          group.lastMessage =
            tempMessages.length === 0
              ? null
              : tempMessages[tempMessages.length - 1];
        }
      });
      setGroups(tempGroups);
      setMessages(tempMessages);
    }
  }, [deleted, groups]);

  useEffect(() => {
    if (friend) {
      const targeted = friend.createdFor.find((u) => u.id === userId);
      if (targeted) {
        let target: ICreatedForDataProps =
          friend.userId === userId
            ? friend.createdFor[0]
            : friend.createdFor[1];
        const message: IMessageProps = {
          id: friend.id,
          referenceId: friend.referenceId,
          type: getMessageType(friend.userId, userId!),
          content: friend.content,
          createdOn: getTimeConverted(new Date(friend.createdAt)),
          groupId: friend.groupId,
          status: friend.status,
          fromId: friend.createdFor[0].id,
          toId: friend.createdFor[1].id,
        };
        const tempGroup = {
          id: friend.groupId,
          name: getNameOfUser(target),
          displayImage: target.displayImage,
          targetId: target.id,
          isStatus: false,
          isOnline: false,
          messages: [message],
          lastMessage: message,
        };
        const tempGroups = groups;
        tempGroups[tempGroups.length] = tempGroup;
        setGroups(tempGroups);
        setFriend(null);
      }
    }
  }, [friend]);

  const onDeleteHandler = async (referenceId: string) => {
    setLoading(true);
    await fetch(
      `${apiUrls.message}?referenceId=${referenceId}&groupId=${group.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let tempMessages;
        const tempGroups = groups;
        tempGroups.forEach((group) => {
          if (group?.id === data?.groupId) {
            tempMessages = group?.messages?.filter(
              (g) => g.referenceId !== referenceId
            );
            group.messages = tempMessages;
            group.lastMessage =
              tempMessages.length === 0
                ? null
                : tempMessages[tempMessages.length - 1];
          }
        });
        setLoading(false);
        setGroups(tempGroups);
        setMessages(tempMessages);
        socket?.emit("delete-message", { referenceId, groupId: group.id });
      });
  };

  const groupMessages = (messages: IMessageDataProps[], userId: string) => {
    const groups = new Map();
    let groupId,
      group,
      tempMessages,
      target: ICreatedForDataProps,
      createdOnDate;
    messages?.forEach((message: IMessageDataProps, _: any) => {
      groupId = message.groupId;
      createdOnDate = new Date(message.createdAt);
      Object.assign(message, {
        type: getMessageType(message.userId, userId),
        createdOnDate,
        createdOn: getTimeConverted(createdOnDate),
      });
      if (groups.has(groupId)) {
        group = groups.get(groupId);
        tempMessages = group.messages;
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
            name: getNameOfUser(target),
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

    socket.on("is-active", (active) => {
      setActive(active);
    });

    socket.on("delete-message", (msg) => {
      setDeleted(msg);
    });

    socket.on("new-friend", (msg) => {
      setFriend(msg);
    });
  };

  const onChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);

    socket?.emit("is-active", {
      value: true,
      groupId: group.id,
      name: user?.firstName ?? strings.someone,
      userId,
    });
  };

  const sendMessage = (newMessage: IMessageProps) => {
    if (newMessage?.content && socket) {
      const tempGroup = group;

      const tempGroupMessages = tempGroup?.messages;
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
      setMessages(tempGroupMessages);
      setNotifs(null);
      if (textInputRef?.current) {
        textInputRef.current.focus();
      }
      socket.emit("is-active", false);
      socket.emit("new-message", newMessage);
    }
  };

  const onSubmitHandler = () => {
    if (input && group) {
      sendMessage({
        id: "NEW_MESSAGE",
        referenceId: getRandomNumber(),
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
        id: "NEW_MESSAGE",
        referenceId: getRandomNumber(),
        type: messageTypes.SENT,
        createdOn: new Date().toISOString(),
        groupId: group.id,
        status: true,
        fromId: userId,
        toId: group.targetId,
        content: "MESSAGE_CONTENT",
      };
      if (storeLocally) {
        const formData = new FormData();
        Object.values(files).forEach((file) => {
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
            setNotifs(getRandomNumber());
          });
      } else {
        Object.values(files).forEach((file) => {
          (async () => {
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
            setNotifs(getRandomNumber());
          })();
        });
      }
    }
  };

  const onSelectGroupHandler = async (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    setGroup(group);
    setMessages(group?.messages);
    textInputRef?.current?.focus();
    setSection(sections.group);
  };

  const onKeyDownHandler = (e: { key: string }) =>
    e.key === "Enter" && onSubmitHandler();

  const onAddFriendHandler = (messageData: IMessageDataProps) => {
    let target: ICreatedForDataProps =
      messageData.userId === userId
        ? messageData.createdFor[0]
        : messageData.createdFor[1];
    const message: IMessageProps = {
      id: messageData.id,
      referenceId: messageData.referenceId,
      type: getMessageType(messageData.userId, userId!),
      content: messageData.content,
      createdOn: getTimeConverted(new Date(messageData.createdAt)),
      groupId: messageData.groupId,
      status: messageData.status,
      fromId: messageData.createdFor[0].id,
      toId: messageData.createdFor[1].id,
    };
    const tempGroup = {
      id: messageData.groupId,
      name: getNameOfUser(target),
      displayImage: target.displayImage,
      targetId: target.id,
      isStatus: false,
      isOnline: false,
      messages: [message],
      lastMessage: message,
    };
    const tempGroups = groups;
    tempGroups[tempGroups.length] = tempGroup;
    setGroups(tempGroups);
    setGroup(tempGroup);
    setMessages([message]);
    socket?.emit("new-friend", messageData);
    setSection(sections.group);
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
              <SectionSwitch
                section={section}
                lastMessageRef={lastMessageRef}
                onChangeHandler={onChangeHandler}
                onKeyDownHandler={onKeyDownHandler}
                onSubmitHandler={onSubmitHandler}
                onMediaHandler={onMediaHandler}
                onDeleteHandler={onDeleteHandler}
                onAddFriendHandler={onAddFriendHandler}
                loading={loading}
                groups={groups}
                user={user}
                group={group}
                setGroup={setGroup}
                messages={messages}
                textInputRef={textInputRef}
                input={input}
                active={active}
                notifs={notifs}
              />
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
