import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
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
          <div className="flex items-center pb-4">
            <div className="basis-1/4">
              <h1 className="text-xl text-white font-bold"># Browse</h1>
            </div>
            <div className="basis-3/4 flex justify-end items-center">
              <h1 className="text-xl text-white">
                <Link href="/cart" title="Checkout Items">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </Link>
              </h1>
            </div>
          </div>
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
