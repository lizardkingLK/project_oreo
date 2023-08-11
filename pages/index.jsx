import React, { useState, useRef, useEffect, Fragment } from "react";
import Layout from "@/components/layout";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import {
  apiUrls,
  groupTypes,
  mediaTypes,
  messageTypes,
  sections,
  staticValues,
} from "@/utils/enums";
import io from "socket.io-client";
import ChevronBack from "@/components/svgs/chevronBack";
import Bars from "@/components/svgs/bars";
import { getRandomNumber, getTimeConverted, isDevEnv } from "@/utils/helpers";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
import Dashboard from "@/components/dashboard";
import { useAuth } from "@clerk/nextjs";
import Welcome from "@/components/welcome";
import AddFriend from "@/components/sections/friends/add";
import { getPublicUrl, uploadFile } from "@/lib/supabase";
let socket;

const Messages = () => {
  const [navbar, setNavbar] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [section, setSection] = useState(sections.home);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(false);
  const [notifs, setNotifs] = useState(null);

  const textInputRef = useRef(null);
  const lastMessageRef = useRef(null);

  const { isLoaded, userId, isSignedIn } = useAuth();

  useEffect(() => {
    if (section !== sections.group) {
      setGroup(null);
    }
  }, [section]);

  useEffect(() => setNavbar(false), [group, input]);

  useEffect(() => {
    const initializeFeeds = async (userId) => {
      await fetch(`${apiUrls.feed}?id=${userId}`)
        .then((response) => response.json())
        .then((data) => setFeeds(data));
    };

    const initializeGroups = async (userId) => {
      await fetch(`${apiUrls.group}?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => groupMessages(data, userId));
    };

    if (userId) {
      initializeGroups(userId);
      initializeFeeds(userId);
      socketInitializer((sock) => sock.emit("new-window", { userId }));
    }
  }, [userId]);

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

  const groupMessages = (messages, userId) => {
    const groups = new Map();
    let groupId, group, tempMessages, target, createdOnDate;
    messages &&
      messages.length > 0 &&
      messages.forEach((message, _) => {
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

  const socketInitializer = async (proceed) => {
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

    proceed(socket);
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket &&
      socket.emit("is-typing", {
        value: true,
        groupId: group.id,
        name: "Someone",
        userId,
      });
  };

  const sendMessage = (newMessage) => {
    if (newMessage && newMessage.content && socket) {
      const tempGroup = group,
        tempGroupMessages = tempGroup.messages;
      newMessage.createdOn = getTimeConverted(new Date(newMessage.createdOn));
      tempGroupMessages[tempGroupMessages.length] = newMessage;
      Object.assign(tempGroup, {
        messages: tempGroupMessages,
        lastMessage: newMessage,
      });
      setInput("");
      setGroup(tempGroup);
      setNotifs(null);
      textInputRef.current.focus();
      socket.emit("is-typing", false);
      socket.emit("new-message", newMessage);
    }
  };

  const onSubmitHandler = () => {
    if (input) {
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

  const onMediaHandler = async (files) => {
    const newMessage = {
      type: messageTypes.SENT,
      createdOn: new Date().toISOString(),
      groupId: group.id,
      status: true,
      fromId: userId,
      toId: group.targetId,
    };
    if (isDevEnv()) {
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
        const response = await uploadFile(file, staticValues.attachments, path);
        if (response == null || response.error) {
          throw response.error;
        }
        const { data } = getPublicUrl(staticValues.attachments, path);
        newMessage.content = `[${mediaTypes.image}](${data.publicUrl})`;
        sendMessage(newMessage);
        setNotifs(Math.random());
      });
    }
  };

  const onSelectGroupHandler = async (groupId) => {
    setGroup(groups.find((g) => g.id === groupId));
    if (group && textInputRef.current) {
      textInputRef.current.focus();
    }
    setSection(sections.group);
  };

  const onKeyDownHandler = (e) => {
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
                  status={isSignedIn}
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
                      <div className="basis-11/12">
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
                  <Dashboard groups={groups} feeds={feeds} />
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
