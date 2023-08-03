import Image from "next/image";
import React from "react";

const Register = () => {
  return (
    <div className="h-screen flex justify-center items-center text-white bg-stone-800">
      <div className="w-96 bg-stone-900 rounded-3xl">
        <div className="p-8 flex justify-center">
          <Image
            src={"/favicon.png"}
            width={50}
            height={50}
            alt={"oreo_logo"}
          />
        </div>
        <div className="pb-2 px-12 flex flex-col justify-center items-start">
          <label htmlFor="username" className="font-bold">
            Username
          </label>
          <input
            className="px-4 py-2 text-md text-black w-full rounded-lg bg-stone-200"
            type="text"
            id="username"
            name="Username"
          />
        </div>
        <div className="py-2 px-12 flex flex-col justify-center items-start">
          <label htmlFor="username" className="font-bold">
            Email
          </label>
          <input
            className="px-4 py-2 text-md text-black w-full rounded-lg bg-stone-200"
            type="email"
            id="email"
            name="Email"
          />
        </div>
        <div className="py-2 px-12 flex flex-col justify-center items-start">
          <label htmlFor="username" className="font-bold">
            Password
          </label>
          <input
            className="px-4 py-2 text-md text-black w-full rounded-lg bg-stone-200"
            type="password"
            id="password"
            name="Password"
          />
        </div>
        <div className="py-2 px-12 flex flex-col justify-center items-start">
          <label htmlFor="username" className="font-bold">
            Repeat Password
          </label>
          <input
            className="px-4 py-2 text-md text-black w-full rounded-lg bg-stone-200"
            type="password"
            id="repeatPassword"
            name="RepeatPassword"
          />
        </div>
        <div className="pt-6 pb-12 px-12 flex justify-center">
          <button
            className="bg-stone-800 hover:bg-stone-900 text-white p-4 w-full rounded-md"
            type="submit"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
