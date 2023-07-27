import React from "react";
import { IUserNavbarProps } from "@/types";
import Image from "next/image";
import Bars from "@/components/svgs/bars";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Invitation from "@/components/svgs/invitation";

const UserNavbar = (props: IUserNavbarProps) => {
  const { isSignedIn } = useAuth();
  if (props) {
    const { navbar, setNavbar } = props;
    return (
      <nav
        className={`absolute top-0 left-0 h-screen w-3/4 md:w-1/4 shadow-green-400 shadow-2xl z-10
            ${
              navbar ? "flex flex-col" : "hidden"
            } bg-gradient-to-r from-green-400 to-green-700`}
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
        {isSignedIn ? (
          <Link
            className="text-xl text-center p-4 hover:text-white hover:bg-orange-600 font-medium flex items-center justify-center"
            href="/sign-in"
          >
            <Invitation />
            &nbsp;&nbsp;&nbsp;Invite
          </Link>
        ) : (
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
