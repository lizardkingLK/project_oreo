import React, { Fragment } from "react";
import { IUserNavbarProps } from "@/types";
import Image from "next/image";
import Bars from "@/components/svgs/bars";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Invitation from "@/components/svgs/invitation";
import Home from "@/components/svgs/home";
import Feeds from "@/components/svgs/feeds";
import { sections } from "@/utils/enums";

const UserNavbar = (props: IUserNavbarProps) => {
  const { isSignedIn } = useAuth();

  if (props) {
    const { navbar, setNavbar, setSection, newUser } = props;

    const handleSelection = (selection: number) => {
      setSection(selection);
      setNavbar(false);
    };

    return (
      <nav
        className={`fixed top-0 left-0 h-screen w-3/4 md:w-1/4 shadow-green-400 shadow-2xl z-10
            ${
              navbar ? "flex flex-col" : "hidden"
            } bg-gradient-to-r from-green-400 to-green-700`}
      >
        <div className="flex justify-center items-center p-4">
          {isSignedIn ? (
            <div className="p-4">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarImage: "w-12 h-12",
                    avatarBox: "w-12 h-12",
                  },
                }}
              />
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
          <Fragment>
            <button
              className="text-xl text-center p-4 hover:text-white hover:bg-stone-600 font-medium flex items-center justify-start"
              onClick={() =>
                handleSelection(
                  newUser ? sections.home : sections.introduction
                )
              }
            >
              <Home />
              &nbsp;&nbsp;&nbsp;Home
            </button>
            <button
              className="text-xl text-center p-4 hover:text-white hover:bg-stone-600 font-medium flex items-center justify-start"
              onClick={() => handleSelection(sections.addFriend)}
            >
              <Invitation />
              &nbsp;&nbsp;&nbsp;Add Friend
            </button>
            <button
              className="text-xl text-center p-4 hover:text-white hover:bg-stone-600 font-medium flex items-center justify-start"
              onClick={() => handleSelection(sections.feeds)}
            >
              <Feeds />
              &nbsp;&nbsp;&nbsp;Feeds
            </button>
          </Fragment>
        ) : (
          <Link
            className="text-xl text-center p-4 hover:text-white hover:bg-stone-600 font-medium"
            href="/sign-in"
          >
            Login
          </Link>
        )}
        {navbar && (
          <button
            className={`absolute left-full mt-8 ml-4 hover:text-stone-600
                        ${navbar ? "text-stone-800" : "text-white"}`}
            onClick={(prevState) => setNavbar(!prevState)}
          >
            <Bars />
          </button>
        )}
      </nav>
    );
  } else return null;
};

export default UserNavbar;
