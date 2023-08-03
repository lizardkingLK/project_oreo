import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        className="m-2"
        width={50}
        height={50}
        alt="logo"
        src={"/favicon.png"}
      />
      <h1 className="m-2 text-4xl text-white font-bold">Page Not Found</h1>
      <h1 className="m-2 text-xl text-green-500 font-bold">
        <Link href="/">Home</Link>
      </h1>
    </div>
  );
};

export default Error;
