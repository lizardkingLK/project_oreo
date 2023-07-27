import Layout from "@/components/layout";
import UserNavbar from "@/components/navs/user";
import Bars from "@/components/svgs/bars";
import Spinner from "@/components/svgs/spinner";
import { apiUrls } from "@/utils/enums";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

const AddFriend = () => {
  const [email, setEmail] = useState("");
  const [navbar, setNavbar] = useState(false);

  const { isLoaded, userId, isSignedIn } = useAuth();

  const handleInvitation = async () => {
    await fetch(apiUrls.group, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userId }),
    });
    setEmail("");
  };

  if (!isLoaded) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Spinner size={12} />
      </section>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen" id="divAddFriend">
        <div className="block md:flex items-center p-4 border-gray-900">
          <div className="basis-1/4 flex justify-between md:justify-start items-center my-4 md:m-0">
            {isSignedIn && (
              <button
                id="btnToggleNavbar"
                className="mr-4 md:mr-2 text-white hover:text-orange-600"
                onClick={() => setNavbar(!navbar)}
              >
                <Bars />
              </button>
            )}
            {!navbar && (
              <h1 className="ml-4 md:ml-2 text-3xl text-center md:text-left text-white font-bold">
                OREO
              </h1>
            )}
          </div>
        </div>
        {isSignedIn && (
          <section className="flex justify-center">
            {navbar ? (
              <div className="basis-3/4 md:basis-1/4">
                <UserNavbar navbar={navbar} setNavbar={setNavbar} />
              </div>
            ) : (
              <div
                className={
                  "bg-black md:bg-transparent md:relative md:block container p-4"
                }
              >
                <h1
                  className="text-2xl text-white font-bold py-4"
                  id="textTitle"
                >
                  Add Friend
                </h1>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-4xl font-bold w-full bg-transparent outline-none placeholder-gray-400 text-green-500 py-4"
                  placeholder="Enter email..."
                />
                <div className="flex justify-end text-white py-4">
                  <Link
                    href={"/"}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    title="Home"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleInvitation}
                    title="Invite"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </Layout>
  );
};

export default AddFriend;
