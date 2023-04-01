import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import FeedList from "@/components/feeds";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import { useSession, signIn, signOut } from "next-auth/react";
import { apiUrls, authStates, messageTypes } from "@/utils/enums";
import io from "socket.io-client";
import ChevronBack from "@/components/svgs/chevronBack";
import Bars from "@/components/svgs/bars";
let socket;

const Messages = () => {
  const { data: session, status } = useSession();
  const [navbar, setNavbar] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(false);
  const [notifs, setNotifs] = useState(false);
  const textInputRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => initializeData, []);
  useEffect(() => socketInitializer, []);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [notifs, input, group]);
  useEffect(() => {
    if (output) {
      const tempGroup = groups.find((group) => group.id === output.groupId);
      if (tempGroup) {
        const tempGroupMessages = tempGroup.messages,
          tempLastMessage = {
            type: messageTypes.RECEIVED,
            content: output.content,
            authorId: 1,
            createdOn: output.createdOn,
            groupId: tempGroup.id,
          };
        tempGroupMessages[tempGroupMessages.length] = tempLastMessage;
        Object.assign(tempGroup, {
          messages: tempGroupMessages,
          lastMessage: tempLastMessage,
        });
        setGroup(tempGroup);
        setNotifs(true);
      }
    }
  }, [output, groups]);
  useEffect(() => {
    setNavbar(false);
  }, [group]);
  useEffect(() => {
    console.log({ data: session, status });
  }, [session, status]);

  const initializeData = async () => {
    await fetch(apiUrls.feed)
      .then((response) => response.json())
      .then((data) => setFeeds(data));

    await fetch(apiUrls.message)
      .then((response) => response.json())
      .then((data) => setGroups(data));
  };

  const socketInitializer = async () => {
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

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
    socket.emit("is-typing", true);
  };

  const getCurrentTime = () => {
    const tempDate = new Date(),
      tempHours = tempDate.getHours().toString().padStart(2, 0),
      tempMinutes = tempDate.getMinutes().toString().padStart(2, 0);
    return `${tempHours}:${tempMinutes}`;
  };

  const onSubmitHandler = () => {
    if (input && socket) {
      const tempGroup = group,
        tempGroupMessages = tempGroup.messages,
        tempLastMessage = {
          type: messageTypes.SENT,
          content: input,
          authorId: 1,
          createdOn: getCurrentTime(),
          groupId: tempGroup.id,
        };
      tempGroupMessages[tempGroupMessages.length] = tempLastMessage;
      Object.assign(tempGroup, {
        messages: tempGroupMessages,
        lastMessage: tempLastMessage,
      });
      setInput("");
      setGroup(tempGroup);
      setNotifs(false);
      textInputRef.current.focus();
      socket.emit("is-typing", false);
      socket.emit("new-message", tempLastMessage);
    }
  };

  const onSelectGroupHandler = (groupId) => {
    setGroup(groups && groups.find((g) => g.id === groupId));
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  return (
    <Layout>
      <main className="bg-black" id="messages">
        <div>
          <div className="block md:flex items-center p-4 border-gray-900">
            <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
              <button
                className={`pr-4 ${
                  navbar ? "text-orange-800" : "text-white"
                } hover:text-orange-600`}
                onClick={() => setNavbar(!navbar)}
              >
                <Bars />
              </button>
              <h1 className="text-3xl text-center md:text-left text-white font-bold">
                Oreo
              </h1>
            </div>
            <div className="basis-3/4 flex justify-center md:justify-end">
              {status === authStates.authenticated && (
                <FeedList feeds={feeds} />
              )}
            </div>
          </div>
          <nav
            className={`px-4 pb-4 ${
              navbar ? "flex" : "hidden"
            } justify-between`}
          >
            {status === authStates.authenticated && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                >
                  Logout
                </button>
              </>
            )}
            {status === authStates.unauthenticated && (
              <button
                type="button"
                onClick={() => signIn()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>
            )}
          </nav>
          <section className="flex justify-center">
            {status === authStates.authenticated && (
              <>
                <div className="basis-1/4">
                  <MessageLinkList
                    groups={groups}
                    setGroup={onSelectGroupHandler}
                    selectedGroup={group}
                  />
                </div>
                <div
                  className={`${
                    group ? "block" : "hidden"
                  } absolute top-0 bg-black md:relative md:block container basis-3/4`}
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
                          <h1 className="flex text-xl text-white font-bold">
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
                      <div className="h-[calc(100vh_-_28vh)] md:h-[calc(100vh_-_36vh)] overflow-y-scroll">
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
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Messages;
