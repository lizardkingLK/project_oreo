import React, { useState, useRef, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getPublicUrl, uploadFile } from "@/lib/supabase";

import {
  ICreatedForDataProps,
  IDeletedMessageProps,
  IGroupProps,
  IMessageDataProps,
  IMessageProps,
  IUserOnlineProps,
} from "@/types";

import {
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
  isImage,
  isLocalStorage,
  writeContentToClipboard,
} from "@/utils/helpers";

import LayoutSwitch from "@/components/layout";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
import SectionSwitch from "@/components/sections";
import {
  createSocket,
  deleteMessage,
  getGroups,
  saveFile,
  updateUnread,
} from "@/utils/http";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Messages = () => {
  const [storeLocally, _] = useState(isLocalStorage());
  const [navbar, setNavbar] = useState(false);
  const [groups, setGroups] = useState<IGroupProps[]>([]);
  const [group, setGroup] = useState<any>(null);
  const [section, setSection] = useState(sections.loading);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [active, setActive] = useState<any>(false);
  const [notifs, setNotifs] = useState<null | boolean | string>(null);
  const [messages, setMessages] = useState<IMessageProps[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<null | IDeletedMessageProps>(null);
  const [friend, setFriend] = useState<null | IMessageDataProps>(null);
  const [rooms, setRooms] = useState<boolean>(false);
  const [online, setOnline] = useState<null | IUserOnlineProps>(null);

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
    if (userId) {
      getGroups(userId).then((data) => {
        if (data.length > 0) {
          groupMessages(data, userId);
          setSection(sections.home);
        } else {
          setSection(sections.introduction);
        }
      });
      initializeSocket().then(() => socket.emit("identity", userId));
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
      const tempGroupIndex = groups.findIndex((g) => g.id === output.groupId),
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
            userId: null,
            readBy: output.readBy,
          };
        tempGroupMessages[tempGroupMessages.length] = newMessage;
        Object.assign(tempGroup, {
          messages: tempGroupMessages,
          lastMessage: newMessage,
          unreadCount:
            group?.id === output.groupId ? 0 : tempGroup.unreadCount + 1,
        });

        groups.splice(tempGroupIndex, 1);
        groups.splice(0, 0, tempGroup);

        if (group?.id === output.groupId) {
          setMessages(tempGroupMessages);
        }
        setNotifs(getRandomNumber());
      }
      setOutput(null);
    }
  }, [output, groups, group]);

  useEffect(() => {
    if (online) {
      const { userId: uId, groupId, value } = online,
        tempGroup = groups.find((g) => g.id === groupId && g.targetId === uId);
      if (tempGroup) {
        tempGroup.isOnline = value;
        Object.assign(groups, tempGroup);
      }
      setOnline(null);
    }
  }, [online, groups, userId]);

  useEffect(() => {
    if (deleted) {
      const { referenceId, groupId } = deleted;
      let tempMessages, deletedMessage: IMessageProps | undefined;
      const tempGroups = groups;
      tempGroups.forEach((g) => {
        if (g?.id === groupId) {
          deletedMessage = g?.messages?.find(
            (m) => m.referenceId === referenceId
          );
          if (
            g.unreadCount > 0 &&
            deletedMessage?.readBy.find((rb) => rb.id === userId && !rb.value)
          ) {
            g.unreadCount = g.unreadCount - 1;
          }
          tempMessages = g?.messages?.filter(
            (m) => m.referenceId !== referenceId
          );
          g.messages = tempMessages;
          g.lastMessage =
            tempMessages.length === 0
              ? null
              : tempMessages[tempMessages.length - 1];
        }
      });
      setGroups(tempGroups);
      if (group?.id === groupId) {
        setMessages(tempMessages);
      }
      setDeleted(null);
    }
  }, [deleted, groups, group, userId]);

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
          type: getMessageType(friend.userId, userId),
          content: friend.content,
          createdOn: getTimeConverted(new Date(friend.createdAt)),
          groupId: friend.groupId,
          status: friend.status,
          fromId: friend.createdFor[0].id,
          toId: friend.createdFor[1].id,
          userId: null,
          readBy: friend?.readBy,
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
          unreadCount: 1,
        };
        const tempGroups = groups;
        tempGroups[tempGroups.length] = tempGroup;
        setGroups(tempGroups);
        setFriend(null);
      }
    }
  }, [friend, groups, userId]);

  useEffect(() => {
    if (userId && socket) {
      socket.emit("set-rooms", { userId, groupIds: groups.map((g) => g.id) });
    }
  }, [rooms, groups, userId]);

  const initializeSocket = async () => {
    createSocket();

    socket = io();

    socket.on("connect", () => console.log("connected"));

    socket.on("new-message", (msg) => {
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

    socket.on("set-rooms", () => {
      setRooms(true);
    });

    socket.on("set-online", (user) => {
      setOnline(user);
    });
  };

  const onCopyHandler = (referenceId: string) => {
    const message = messages?.find(m => m.referenceId === referenceId);
    writeContentToClipboard(message?.content);
  }

  const onDeleteHandler = async (referenceId: string) => {
    setLoading(true);
    deleteMessage(referenceId, group.id).then((data) => {
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
      createdOnDate,
      unreadCount: number,
      hasRead;

    messages?.forEach((message: IMessageDataProps, _: any) => {
      console.log(message.createdAt);

      groupId = message.groupId;
      createdOnDate = new Date(message.createdAt);
      Object.assign(message, {
        type: getMessageType(message.userId, userId),
        createdOnDate,
        createdOn: getTimeConverted(createdOnDate),
      });
      if (message.groupType === groupTypes.PRIVATE) {
        if (message.userId === userId) {
          target = message.createdFor[0];
          hasRead = message.readBy[1].value;
        } else {
          target = message.createdFor[1];
          hasRead = message.readBy[0].value;
        }
        if (groups.has(groupId)) {
          group = groups.get(groupId);
          unreadCount = hasRead ? group.unreadCount : group.unreadCount + 1;
        } else {
          unreadCount = hasRead ? 0 : 1;
        }
      }
      // if public set group details. then ->
      if (groups.has(groupId)) {
        group = groups.get(groupId);
        group.unreadCount = unreadCount;
        tempMessages = group.messages;
        tempMessages[tempMessages.length] = message;
        Object.assign(group, {
          lastMessage: message,
          messages: tempMessages,
        });
      } else {
        group = {
          id: groupId,
          name: getNameOfUser(target),
          displayImage: target?.displayImage,
          targetId: target?.id,
          isStatus: false,
          isOnline: false,
          messages: [message],
          lastMessage: message,
          unreadCount,
        };
        groups.set(groupId, group);
      }
    });
    setGroups(
      Array.from(groups.values()).sort(
        (first, second) =>
          second.lastMessage.createdOnDate - first.lastMessage.createdOnDate
      )
    );
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
      const tempGroup: IGroupProps = group,
        tempGroupMessages = tempGroup?.messages;
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
      socket.emit("is-active", { groupId: tempGroup.id, value: false });
      socket.emit("new-message", newMessage);

      const tempGroupIndex = groups.findIndex((g) => g.id === group.id);
      groups.splice(tempGroupIndex, 1);
      groups.splice(0, 0, tempGroup);
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
        userId: null,
        readBy: [],
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
        userId: null,
        readBy: [],
      };
      if (storeLocally) {
        const formData = new FormData();
        Object.values(files).forEach((file) => {
          formData.append("file", file);
        });

        saveFile(formData).then((data) => {
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
    const tempGroup = groups.find((g) => g.id === groupId);
    if (tempGroup?.id && userId && tempGroup.unreadCount) {
      tempGroup.unreadCount = 0;
      updateUnread(tempGroup?.id, userId);
    }
    socket?.emit("focus-group", { groupId, userId });
    setGroup(tempGroup);
    setMessages(tempGroup?.messages);
    textInputRef?.current?.focus();
    setSection(sections.group);
  };

  const onKeyDownHandler = (e: { key: string }) =>
    e.key === "Enter" && onSubmitHandler();

  const onAddFriendHandler = (messageData: IMessageDataProps) => {
    const target: ICreatedForDataProps =
      messageData.userId === userId
        ? messageData.createdFor[0]
        : messageData.createdFor[1];
    const message: IMessageProps = {
      id: messageData.id,
      referenceId: messageData.referenceId,
      type: getMessageType(messageData.userId, userId),
      content: messageData.content,
      createdOn: getTimeConverted(new Date(messageData.createdAt)),
      groupId: messageData.groupId,
      status: messageData.status,
      fromId: messageData.createdFor[0].id,
      toId: messageData.createdFor[1].id,
      userId: null,
      readBy: [],
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
      unreadCount: 0,
    };
    const tempGroups = groups;
    tempGroups[tempGroups.length] = tempGroup;

    const tempGroupIndex = tempGroups.length - 1;
    groups.splice(tempGroupIndex, 1);
    groups.splice(0, 0, tempGroup);

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
    <LayoutSwitch
      rootElementId="divHome"
      isSignedIn={isSignedIn}
      navbar={navbar}
      setNavbar={setNavbar}
    >
      <section className="flex justify-center">
        <div className={groups.length > 0 ? "basis-3/4 md:basis-1/4" : ""}>
          {navbar ? (
            <UserNavbar
              navbar={navbar}
              setNavbar={setNavbar}
              setSection={setSection}
              newUser={groups.length > 0}
            />
          ) : (
            <div className="mt-24 md:mt-20">
              <MessageLinkList
                groups={groups}
                setGroup={onSelectGroupHandler}
                selectedGroup={group}
                active={active}
                userId={userId}
              />
            </div>
          )}
        </div>
        <div
          className={`basis-3/4 absolute top-0 bg-black md:bg-transparent md:relative md:block container`}
        >
          <SectionSwitch
            section={section}
            setSection={setSection}
            lastMessageRef={lastMessageRef}
            onChangeHandler={onChangeHandler}
            onKeyDownHandler={onKeyDownHandler}
            onSubmitHandler={onSubmitHandler}
            onMediaHandler={onMediaHandler}
            onDeleteHandler={onDeleteHandler}
            onCopyHandler={onCopyHandler}
            onAddFriendHandler={onAddFriendHandler}
            loading={loading}
            groups={groups}
            user={user}
            group={group}
            setGroup={setGroup}
            setMessages={setMessages}
            messages={messages}
            textInputRef={textInputRef}
            input={input}
            active={active}
            notifs={notifs}
            navbar={navbar}
          />
        </div>
      </section>
    </LayoutSwitch>
  );
};

export default Messages;
