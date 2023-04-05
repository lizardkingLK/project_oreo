import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import FeedList from "@/components/feeds";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
import { useSession } from "next-auth/react";
import {
  apiUrls,
  authStates,
  cardBodyTypes,
  messageTypes,
} from "@/utils/enums";
import io from "socket.io-client";
import ChevronBack from "@/components/svgs/chevronBack";
import Bars from "@/components/svgs/bars";
import SummaryCard from "@/components/cards/summary";
import { getCurrentTime } from "@/utils/helpers";
import Avatar from "@/components/avatar";
import Link from "next/link";
import UserNavbar from "@/components/navs/user";
import Spinner from "@/components/svgs/spinner";
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
    if (group) {
      textInputRef.current.focus();
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  return (
    <Layout>
      {status === authStates.loading && (
        <section className="h-screen flex justify-center items-center">
          <Spinner size={12} />
        </section>
      )}
      <main className="bg-black" id="messages">
        <div className="block md:flex items-center py-4 border-gray-900">
          <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
            <button
              className={`mr-4 md:mr-2 hover:text-orange-600 z-20 absolute right-0 md:left-0 md:relative ${
                navbar ? "text-orange-800 right-0 md:left-3/4" : "text-white"
              }`}
              onClick={() => setNavbar(!navbar)}
            >
              <Bars />
            </button>
            <h1 className="ml-4 md:ml-2 text-3xl text-center md:text-left text-white font-bold">
              OREO
            </h1>
          </div>
          <div className="basis-3/4 flex justify-center md:justify-end">
            {status === authStates.authenticated && <FeedList feeds={feeds} />}
          </div>
        </div>
        <UserNavbar navbar={navbar} status={status} />
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
                className={`basis-3/4 absolute top-0 bg-black md:relative md:block container ${
                  group ? "block" : "hidden"
                }`}
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
                {session && !group && (
                  <div className="p-4">
                    <h1 className="text-2xl text-white font-bold">
                      Hello{" "}
                      <span className="text-green-400">
                        {session.token.name}
                      </span>
                    </h1>
                    <div className="pt-4 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2">
                      <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Groups"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={4200}
                      />
                      <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Friends"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={1039}
                      />
                      <SummaryCard
                        cardStyle={
                          "bg-gradient-to-r from-orange-300 to-orange-400 rounded-md"
                        }
                        cardHeaderTitle={"Online"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={103}
                      />
                      <SummaryCard
                        cardStyle={
                          "col-span-2 bg-gradient-to-r from-green-300 to-green-400 rounded-md"
                        }
                        cardHeaderTitle={"Add Friend"}
                        cardBodyType={cardBodyTypes.ELEMENT}
                        cardBodyContent={
                          <input
                            className="text-4xl font-bold w-full bg-transparent outline-none placeholder-black"
                            placeholder="Enter email..."
                          />
                        }
                      />
                      <SummaryCard
                        cardStyle={"bg-green-200 rounded-md"}
                        cardHeaderTitle={"Latest"}
                        cardHeaderContent={
                          <Avatar
                            imagePath="/static/pfp1.jpg"
                            size={30}
                            name="Amelia Nelson"
                            isStatus={false}
                          />
                        }
                        cardBodyType={cardBodyTypes.STRING}
                        cardBodyContent={
                          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni quos non cupiditate mollitia temporibus expedita nobis natus totam exercitationem alias similique optio quisquam quidem ducimus id, odio excepturi illo at."
                        }
                      />
                      <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Unread"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={34}
                      />
                      <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Feeds"}
                        cardBodyType={cardBodyTypes.NUMBER}
                        cardBodyContent={12}
                      />
                      <SummaryCard
                        cardStyle={"bg-orange-300 rounded-md"}
                        cardHeaderTitle={"Profile"}
                        cardBodyType={cardBodyTypes.ELEMENT}
                        cardBodyContent={
                          <Link
                            href={"/"}
                            className="flex justify-start items-center"
                          >
                            <Avatar
                              imagePath={
                                session.token.picture ?? "/favicon.png"
                              }
                              size={35}
                              name={session.token.name}
                              isStatus={false}
                            />
                            <h1 className="text-3xl w-full max-h-20 overflow-hidden ml-4">
                              {session.token.name}
                            </h1>
                          </Link>
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Messages;
