import React from "react";
import Layout from "@/components/layout";
import io from "socket.io-client";
import Avatar from "@/components/avatar";
import MessageCard from "@/components/card/message";
import MessageLink from "@/components/links/message";
let socket;

const FeedList = ({ feeds }) => {
  return (
    feeds &&
    feeds.map((feed, index) => (
      <a href={"#" + (index + 1)} key={index}>
        <Avatar
          name={feed.name}
          imagePath={feed.imagePath}
          size={50}
          isStatus={feed.isStatus}
        />
      </a>
    ))
  );
};

const MessageLinkList = ({ groups, setGroup, selectedGroup }) => {
  return (
    groups &&
    groups.map((group, index) => (
      <MessageLink
        key={index}
        messageId={group.id}
        messageOnClick={setGroup}
        messageImagePath={group.displayImage}
        messageImageSize={60}
        messageAuthorName={group.name}
        messageContent={group.lastMessage.content}
        messageTime={group.lastMessage.createdOn}
        messageAuthorType={0}
        messageAuthorIsStatus={group.isStatus}
        messageIsActive={selectedGroup && selectedGroup.id === group.id}
      />
    ))
  );
};

const MessageList = ({ group, typing, lastMessageRef }) => {
  return (
    <>
      {group &&
        group.messages &&
        group.messages.map((message, index) => (
          <MessageCard
            key={index}
            type={message.type}
            content={message.content}
            messageAuthorName={group.name}
            messageTime={message.createdOn}
            messageImagePath={group.displayImage}
          />
        ))}
      <div ref={lastMessageRef}>
        {typing && (
          <p className="text-sm m-8 text-gray-500">Someone is typing...</p>
        )}
      </div>
    </>
  );
};

const MessageEditor = ({
  group,
  input,
  onChangeHandler,
  onSubmitHandler,
  textInputRef,
}) => {
  return (
    group && (
      <div className="flex items-center m-4">
        <button
          className="py-4 pl-4 rounded-l-full bg-gray-900 text-white hover:text-green-500 flex items-center justify-center"
          title="Insert Emoji"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </button>
        <input
          ref={textInputRef}
          className="basis-11/12 p-4 outline-none text-xl font-semibold bg-gray-900 text-white"
          placeholder="Type a message"
          value={input}
          onChange={onChangeHandler}
          title="Type Message Here"
        />
        <button
          className="p-4 rounded-r-full bg-gray-900 text-white hover:text-green-500"
          title="Attach File"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </button>
        <button
          type="submit"
          className="p-4 ml-4 rounded-full bg-green-500 hover:bg-green-600 text-white"
          title="Send Message"
          onClick={onSubmitHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    )
  );
};

const Messages = () => {
  const [feeds, setFeeds] = React.useState([
    {
      name: "Amelia Nelson",
      imagePath: "/static/pfp1.jpg",
      size: 50,
      isStatus: false,
    },
    {
      name: "Sam Jetstream",
      imagePath: "/static/pfp2.jpg",
      size: 50,
      isStatus: true,
    },
  ]);
  const [groups, setGroups] = React.useState([
    {
      id: 1,
      name: "Amelia Nelson",
      displayImage: "/static/pfp1.jpg",
      isStatus: false,
      messages: [
        {
          type: 2,
          content: "Hi How are you?",
          authorId: 2,
          createdOn: "08:30",
        },
        {
          type: 1,
          content: "Lorem ipsum dolor sit am.",
          authorId: 1,
          createdOn: "09:12",
        },
      ],
      lastMessage: {
        type: 0,
        content: "Hi How are you? I'm doing great.",
        authorId: 2,
        createdOn: "09:12",
      },
    },
    {
      id: 2,
      name: "Sam Jetstream",
      displayImage: "/static/pfp2.jpg",
      isStatus: true,
      messages: [
        {
          type: 2,
          content: "I am JetStream Sam.",
          authorId: 2,
          createdOn: "10:00",
        },
        {
          type: 1,
          content: "Okay Man",
          authorId: 1,
          createdOn: "02:12",
        },
      ],
      lastMessage: {
        type: 1,
        content: "Okay Man",
        authorId: 1,
        createdOn: "02:12",
      },
    },
  ]);
  const [group, setGroup] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const textInputRef = React.useRef(null);
  const lastMessageRef = React.useRef(null);

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

  const onSubmitHandler = () => {
    if (input && socket) {
      const tempGroup = group,
        tempGroupMessages = tempGroup.messages,
        tempDate = new Date(),
        tempHours = tempDate.getHours().toString().padStart(2, 0),
        tempMinutes = tempDate.getMinutes().toString().padStart(2, 0),
        tempLastMessage = {
          type: 1,
          content: input,
          authorId: 1,
          createdOn: `${tempHours}:${tempMinutes}`,
        };
      tempGroupMessages[tempGroupMessages.length] = tempLastMessage;
      Object.assign(tempGroup, {
        messages: tempGroupMessages,
        lastMessage: tempLastMessage,
      });
      setInput("");
      setGroup(tempGroup);
      textInputRef.current.focus();
      socket.emit("is-typing", false);
      socket.emit("new-message", input);
    }
  };

  const onSelectGroupHandler = (groupId) => {
    setGroup(groups && groups.find((g) => g.id === groupId));
  };

  React.useEffect(() => socketInitializer, []);

  React.useEffect(() => {
    if (output) {
      console.log(output);
    }
  }, [output]);

  React.useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [input, output]);

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
              <div className="h-96 overflow-y-scroll">
                <MessageList
                  group={group}
                  typing={typing}
                  lastMessageRef={lastMessageRef}
                />
              </div>
              <div className="mt-20">
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
