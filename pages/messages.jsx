import React from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import io from "socket.io-client";
import Avatar from "@/components/avatar";
let socket;

const Messages = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  React.useEffect(() => socketInitializer, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => console.log("connected"));

    socket.on("update-input", (msg) => setOutput(msg));
  };

  React.useEffect(() => {
    if (output) {
      console.log(output);
    }
  }, [output]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  return (
    <Layout>
      <main className="bg-black p-2" id="messages">
        <div className="pt-8 pb-24" id="dashboard">
          <div className="flex items-center pb-4 border-b-2 border-gray-800">
            <div className="basis-1/4">
              <h1 className="text-xl text-white font-bold"># Messages</h1>
            </div>
            <div className="basis-3/4 flex justify-end">
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
          <div className="pb-4 flex">
            <div className="basis-1/4">
              {/* chat item link 1 */}
              <a href="#1">
                <div className="flex items-start py-4 hover:bg-gray-900">
                  {/* item pfp */}
                  <Avatar
                    imagePath={"/static/pfp3.jpg"}
                    size={60}
                    isOnline={true}
                  />
                  <div className="basis-2/4 ml-4">
                    <h1 className="text-xl text-white font-bold">John Doe</h1>
                    <p className="text-sm text-gray-500 font-bold">
                      Hi how are you?
                    </p>
                  </div>
                  <div className="basis-1/4 flex justify-end">
                    <p className="text-md text-white font-bold">9:00</p>
                  </div>
                </div>
              </a>

              {/* chat item link 2 */}
              <a href="#2">
                <div className="flex items-start py-4 mt-2 hover:bg-gray-900">
                  {/* item pfp */}
                  <Avatar
                    imagePath={"/static/pfp2.jpg"}
                    size={60}
                    isOnline={true}
                  />
                  <div className="basis-2/4 ml-4">
                    <h1 className="text-xl text-white font-bold">
                      Sam Jetstream
                    </h1>
                    <p className="text-sm text-gray-500 font-bold">
                      Working with you today.
                    </p>
                  </div>
                  <div className="basis-1/4 flex justify-end">
                    <p className="text-md text-white font-bold">8:55</p>
                  </div>
                </div>
              </a>

              {/* chat item link 3 */}
              <a href="#3">
                <div className="flex items-start py-4 mt-2 hover:bg-gray-900">
                  {/* item pfp */}
                  <Avatar
                    imagePath={"/static/pfp1.jpg"}
                    size={60}
                    isOnline={false}
                  />
                  <div className="basis-2/4 ml-4">
                    <h1 className="text-xl text-white font-bold">
                      Amelia Nelson
                    </h1>
                    <p className="text-sm text-gray-500 font-bold">
                      Thank you very much!
                    </p>
                  </div>
                  <div className="basis-1/4 flex justify-end">
                    <p className="text-md text-white font-bold">8:33</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="basis-3/4">
              {/* message card item */}
              <div></div>

              <input
                placeholder="Type something"
                value={input}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Messages;
