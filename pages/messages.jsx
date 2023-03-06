import React from "react";
import Layout from "@/components/layout";
import io from "socket.io-client";
import Avatar from "@/components/avatar";
import MessageCard from "@/components/card/message";
import MessageLink from "@/components/links/message";
let socket;

const Messages = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  React.useEffect(() => socketInitializer, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setOutput(msg);
    });
  };

  React.useEffect(() => {
    if (output) {
      console.log(output);
    }
  }, [output]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
    if (socket) {
      socket.emit("input-change", value);
    }
  };

  return (
    <Layout>
      <main className="bg-black p-2" id="messages">
        <div className="py-8">
          <div className="block md:flex items-center pb-4 border-b-2 border-gray-900">
            <div className="my-4 md:m-0 basis-1/4">
              <h1 className="text-xl text-center md:text-left text-white font-bold">
                # Messages
              </h1>
            </div>
            <div className="basis-3/4 flex justify-center md:justify-end">
              <a href="#1">
                <Avatar
                  imagePath={"/static/pfp1.jpg"}
                  size={50}
                  isOnline={false}
                />
              </a>
              <a href="#2">
                <Avatar
                  imagePath={"/static/pfp2.jpg"}
                  size={50}
                  isOnline={true}
                />
              </a>
              <a href="#3">
                <Avatar
                  imagePath={"/static/pfp3.jpg"}
                  size={50}
                  isOnline={true}
                />
              </a>
            </div>
          </div>
          <div className="pb-4 flex justify-center">
            <div className="basis-1/4">
              {/* chat item link 1 */}
              <MessageLink
                messageLink="#1"
                messageImagePath="/static/pfp3.jpg"
                messageImageSize={60}
                messageAuthorName="Arnold Schwarzenegger"
                messageContent="Hi how are you?"
                messageTime="9:00"
                messageAuthorType={0}
                messageAuthorIsOnline={true}
              />

              {/* chat item link 2 */}
              <MessageLink
                messageLink="#2"
                messageImagePath="/static/pfp2.jpg"
                messageAuthorName="Sam Jetstream"
                messageContent="Working with you today."
                messageTime="8:55"
                messageAuthorType={0}
                messageAuthorIsOnline={true}
              />

              {/* chat item link 3 */}
              <MessageLink
                messageLink="#3"
                messageImagePath="/static/pfp1.jpg"
                messageAuthorName="Amelia Nelson"
                messageContent="Thank you very much!"
                messageTime="8:33"
                messageAuthorType={0}
                messageAuthorIsOnline={false}
              />
            </div>
            <div className="hidden md:block basis-3/4">
              {/* outgoing message card item */}
              <MessageCard type={1} content={"Lorem ipsum dolor sit am."} />

              {/* incoming message card item */}
              <MessageCard type={0} content={"Hi How are you?"} />

              <div className="flex items-center m-4">
                <button
                  className="py-4 pl-4 rounded-l-full bg-gray-900 text-white flex items-center justify-center"
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
                <textarea
                  rows={1}
                  className="basis-11/12 p-4 outline-none text-xl font-semibold bg-gray-900 text-white"
                  placeholder="Type a message"
                  value={input}
                  onChange={onChangeHandler}
                  title="Type Message Here"
                ></textarea>
                <button
                  className="p-4 rounded-r-full bg-gray-900 text-white"
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
                  className="p-4 ml-4 rounded-full bg-green-500 text-white"
                  title="Send Message"
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
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Messages;
