import React from "react";
import Layout from "@/components/layout";
import io from "socket.io-client";
import { messageTypes } from "@/utils/enums";
import FeedList from "@/components/feeds";
import MessageLinkList from "@/components/lists/message/MessageLinkList";
import MessageList from "@/components/lists/message/MessageList";
import MessageEditor from "@/components/forms/message";
let socket;

const Messages = () => {
  const [feeds, setFeeds] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [group, setGroup] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [notifs, setNotifs] = React.useState(false);
  const textInputRef = React.useRef(null);
  const lastMessageRef = React.useRef(null);

  React.useEffect(() => initializeData, []);
  React.useEffect(() => socketInitializer, []);
  React.useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [notifs, input]);
  React.useEffect(() => {
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

  const initializeData = async () => {
    await fetch("/api/feed")
      .then((response) => response.json())
      .then((data) => setFeeds(data));

    await fetch("/api/message")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
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

  return (
    <Layout>
      <main className="bg-black p-2" id="messages">
        <div className="py-8">
          <div className="block md:flex items-center pb-4 border-b-2 border-gray-900">
            <div className="my-4 md:m-0 basis-1/4">
              <h1 className="text-3xl text-center md:text-left text-white font-bold">
                Oreo
              </h1>
            </div>
            <div className="basis-3/4 flex justify-center md:justify-end">
              <FeedList feeds={feeds} />
            </div>
          </div>
          <div className="pb-4 flex justify-center">
            <div className="basis-1/4">
              <MessageLinkList
                groups={groups}
                setGroup={onSelectGroupHandler}
                selectedGroup={group}
              />
            </div>
            <div className="hidden md:block basis-3/4">
              {group && (
                <div className="ml-4 my-8">
                  <h1 className="text-xl text-white font-bold">{group.name}</h1>
                  {group.isOnline ? (
                    <h1 className="text-md font-bold text-green-500">Online</h1>
                  ) : (
                    <h1 className="text-md font-bold text-white">
                      {group.lastMessage.createdOn}
                    </h1>
                  )}
                </div>
              )}
              <div className="h-80 overflow-y-scroll">
                <MessageList
                  group={group}
                  typing={typing}
                  notifs={notifs}
                  lastMessageRef={lastMessageRef}
                />
              </div>
              <div className="mt-8 mx-4">
                <MessageEditor
                  group={group}
                  input={input}
                  onChangeHandler={onChangeHandler}
                  onSubmitHandler={onSubmitHandler}
                  textInputRef={textInputRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block container absolute text-white bottom-0 w-full">
          <div className="block md:flex items-center pb-4">
            <div className="my-4 md:m-0 basis-1/4">
              <h1 className="text-sm text-center md:text-left text-white font-bold">
                Oreo 2023
              </h1>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Messages;
