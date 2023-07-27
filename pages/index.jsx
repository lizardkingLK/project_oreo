import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import { apiUrls, mediaTypes, messageTypes } from "@/utils/enums";
import io from "socket.io-client";
import ChevronBack from "@/components/svgs/chevronBack";
import Bars from "@/components/svgs/bars";
import { getTimeConverted } from "@/utils/helpers";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
import Dashboard from "@/components/dashboard";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
let socket;

const Messages = () => {
  const [navbar, setNavbar] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(false);
  const [notifs, setNotifs] = useState(null);
  const [session] = useState({
    token: {
      _id: "6436878a3efc9880a9bd95fa",
      user: { _id: "6436878a3efc9880a9bd95fa" },
    },
  });

  const textInputRef = useRef(null);
  const lastMessageRef = useRef(null);

  const { isLoaded, userId, isSignedIn } = useAuth();

  useEffect(() => setNavbar(false), [group, input]);

  useEffect(() => {
    const initializeFeeds = async (userId) => {
      await fetch(`${apiUrls.feed}?id=${userId}`)
        .then((response) => response.json())
        .then((data) => setFeeds(data));
    };

    const initializeMessages = async (userId) => {
      await fetch(`${apiUrls.message}?id=${userId}`)
        .then((response) => response.json())
        .then((data) => groupMessages(data, userId));
    };

    if (userId) {
      console.log(userId); //user_2Sqj6ho1NeX2sOqq0O87xAi8i0N
      initializeFeeds(userId);
      initializeMessages(userId);
      socketInitializer();
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
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
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
    messages.forEach((message, _) => {
      groupId = message.groupId;
      createdOnDate = new Date(message.createdOn);
      Object.assign(message, {
        type:
          message.fromId === userId ? messageTypes.SENT : messageTypes.RECEIVED,
        createdOn: getTimeConverted(createdOnDate),
        createdOnDate,
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
        target = message.fromId === userId ? message.to : message.from;
        target &&
          groups.set(groupId, {
            id: groupId,
            name: target.name,
            displayImage: target.displayImage,
            targetId: target._id,
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

  const socketInitializer = async () => {
    await fetch(apiUrls.socket);
    socket = io();

    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("update-input", (msg) => {
      setOutput(msg);
    });

    socket.on("is-typing", (typing) => {
      setTyping(typing);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket &&
      socket.emit("is-typing", {
        value: true,
        groupId: group.id,
        name: session.token.name,
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
        sendMessage({
          type: messageTypes.SENT,
          content: `[${mediaTypes.image}](${data.data})`,
          createdOn: new Date().toISOString(),
          groupId: group.id,
          status: true,
          fromId: userId,
          toId: group.targetId,
        });
        setNotifs(Math.random());
      });
  };

  const onSelectGroupHandler = (groupId) => {
    setGroup(groups && groups.find((g) => g.id === groupId));
    if (group) {
      textInputRef.current.focus();
    }
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
        <div className="block md:flex items-center p-4 border-gray-900">
          <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
            {isSignedIn && (
              <button
                id="btnToggleNavbar"
                className="mr-4 md:mr-2 text-white hover:text-orange-600"
                onClick={() => setNavbar(!navbar)}
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
                />
              ) : (
                <MessageLinkList
                  groups={groups}
                  setGroup={onSelectGroupHandler}
                  selectedGroup={group}
                />
              )}
            </div>
            <div
              className={`basis-3/4 absolute top-0 bg-black md:bg-transparent md:relative md:block container 
                ${group ? "block" : "hidden"}`}
            >
              {group && (
                <>
                  <div className="p-4 flex items-center">
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
                    className="h-[calc(100vh_-_28vh)] md:h-[calc(100vh_-_36vh)] overflow-y-scroll"
                    id="divMessageList"
                  >
                    <MessageList
                      group={group}
                      typing={typing}
                      notifs={notifs}
                      lastMessageRef={lastMessageRef}
                    />
                  </div>
                  <div className="bottom-0 m-4">
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
                </>
              )}
              {!group && (
                <Dashboard session={session} groups={groups} feeds={feeds} />
              )}
            </div>
          </section>
        ) : (
          <section
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            id="divWelcome"
          >
            <div className="text-white font-black text-center">
              <span className="text-transparent text-8xl md:text-9xl bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
                OREO
              </span>
              <br />
              <span className="text-2xl tracking-normal md:tracking-widest text-white">
                A Chat Application
              </span>
              <br />
              <div className="mt-4 flex justify-evenly">
                <Link href="/sign-up">
                  <button className="bg-green-600 px-4 py-2 rounded-lg">
                    JOIN
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Messages;
