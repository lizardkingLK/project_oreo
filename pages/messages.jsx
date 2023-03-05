import React from "react";
import Image from "next/image";
import Layout from "@/components/layout";
import io from "socket.io-client";
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
      <main className="bg-black p-2 h-screen" id="messages">
        <div className="pt-8 pb-24" id="dashboard">
          <div className="flex items-center pb-4 border-b-2 border-gray-800">
            <div className="basis-1/4">
              <h1 className="text-xl text-white font-bold"># Messages</h1>
            </div>
            <div className="basis-3/4 flex justify-end">
              <div className="flex justify-center items-center flex-wrap w-10 p-1 bg-black rounded-full border-2 border-red-300 ml-2">
                <Image
                  className="rounded-full"
                  width={50}
                  height={50}
                  src={"/static/pfp1.jpg"}
                  alt={"avatar_image"}
                />
              </div>
              <div className="flex justify-center items-center flex-wrap w-10 p-1 bg-black rounded-full border-2 border-red-400 ml-2">
                <Image
                  className="rounded-full"
                  width={50}
                  height={50}
                  src={"/static/pfp2.jpg"}
                  alt={"avatar_image"}
                />
              </div>
              <div className="flex justify-center items-center flex-wrap w-10 p-1 bg-black rounded-full border-2 border-red-500 ml-2">
                <Image
                  className="rounded-full"
                  width={50}
                  height={50}
                  src={"/static/pfp3.jpg"}
                  alt={"avatar_image"}
                />
              </div>
            </div>
          </div>
          <div className="py-4 flex">
            <div className="basis-1/4">
              {/* chat item link */}
              <a href="#1">
                <div className="flex items-start py-2 hover:bg-gray-900">
                  {/* item pfp */}
                  <div className="flex justify-center items-center flex-wrap w-12 p-1 bg-black rounded-full border-2 border-red-500 ml-2">
                    <Image
                      className="rounded-full"
                      width={60}
                      height={60}
                      src={"/static/pfp3.jpg"}
                      alt={"avatar_image"}
                    />
                  </div>
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
                <div className="flex items-start py-2 mt-2 hover:bg-gray-900">
                  {/* item pfp */}
                  <div className="flex justify-center items-center flex-wrap w-12 p-1 bg-black rounded-full border-2 border-red-400 ml-2">
                    <Image
                      className="rounded-full"
                      width={60}
                      height={60}
                      src={"/static/pfp2.jpg"}
                      alt={"avatar_image"}
                    />
                  </div>
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
                <div className="flex items-start py-2 mt-2 hover:bg-gray-900">
                  {/* item pfp */}
                  <div className="flex justify-center items-center flex-wrap w-12 p-1 bg-black rounded-full border-2 border-red-400 ml-2">
                    <Image
                      className="rounded-full"
                      width={60}
                      height={60}
                      src={"/static/pfp1.jpg"}
                      alt={"avatar_image"}
                    />
                  </div>
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
              {/* <h1 className="text-xl text-white font-bold">_</h1> */}
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
