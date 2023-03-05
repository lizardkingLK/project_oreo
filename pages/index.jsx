import Layout from "@/components/layout";
import Image from "next/image";
import React from "react";
import io from 'socket.io-client';
let socket;

export default function Home() {
  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  React.useEffect(() => socketInitializer(), []);

  return (
    <Layout>
      <main className="bg-black p-2">
        <div className="flex py-14 pb-32">
          <div className="basis-full md:basis-2/4 bg-gradient-to-r from-green-500 to-green-300">
            <h1 className="text-5xl md:text-9xl font-black ">
              One of the Shopping Stores.
            </h1>
            <blockquote className="mx-2 font-bold">
              Browse, Buy, Deliver T-Shirts.
            </blockquote>
          </div>
        </div>
        <div className="pt-8 pb-24" id="browse">
          <h1 className="text-5xl text-white"># Browse</h1>
          <div className="flex justify-center">
            <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
              {Array(7)
                .fill(1)
                .map((v, i) => (
                  <a key={i} href={"/design/" + (i + 1)}>
                    <Image
                      className="border-2 hover:border-green-500"
                      width={200}
                      height={200}
                      src={"/logo.png"}
                      alt={v}
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
