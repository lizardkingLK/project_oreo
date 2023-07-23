import React from "react";
import { IUserNavbarProps } from "@/types";
import Image from "next/image";
import Bars from "@/components/svgs/bars";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

const UserNavbar = (props: IUserNavbarProps) => {
  const { isSignedIn } = useAuth();
  if (props) {
    const { navbar, setNavbar } = props;
    return (
      <nav
        className={`absolute top-0 left-0 h-screen w-3/4 md:w-1/4 shadow-orange-500 shadow-2xl z-10
            ${
              navbar ? "flex flex-col" : "hidden"
            } bg-gradient-to-r from-orange-500 to-orange-500`}
      >
        <div className="flex justify-center items-center p-4">
          {isSignedIn ? (
            <div className="p-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Image
              src={"/favicon.png"}
              alt="logo"
              width={50}
              height={50}
              priority
            />
          )}
        </div>
        {!isSignedIn && (
          <Link
            className="text-xl text-center p-4 hover:text-white hover:bg-orange-600 font-medium"
            href="/sign-in"
          >
            Login
          </Link>
        )}
        {navbar && (
          <button
            className={`absolute left-full mt-8 ml-4 hover:text-orange-600
                        ${navbar ? "text-orange-800" : "text-white"}`}
            onClick={() => setNavbar(!navbar)}
          >
            <Bars />
          </button>
        )}
      </nav>
    );
  } else return null;
};

export default UserNavbar;
