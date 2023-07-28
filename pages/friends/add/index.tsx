import UserCard from "@/components/cards/user";
import Layout from "@/components/layout";
import UserNavbar from "@/components/navs/user";
import Bars from "@/components/svgs/bars";
import Close from "@/components/svgs/close";
import Spinner from "@/components/svgs/spinner";
import { apiUrls, userSearchMessageTypes } from "@/utils/enums";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const AddFriend = () => {
  const [search, setSearch] = useState("");
  const [navbar, setNavbar] = useState(false);
  const [users, setUsers] = useState<null | User[]>(null);
  const [user, setUser] = useState<null | User>();
  const [userFound, setUserFound] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  const { isLoaded, userId, isSignedIn } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      setUsers(
        await fetch(apiUrls.user)
          .then((response) => response.json())
          .then((data) => data)
      );
    };
    getUsers();
  }, []);

  const handleInvitation = async () => {
    await fetch(apiUrls.group, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search, userId }),
    });
  };

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const value = searchRef?.current?.value ?? "";
    const length = value.length;
    setUserFound(userSearchMessageTypes.notFound);
    if (users && value) {
      const user = users.find(
        (u) =>
          u.username?.substring(0, length) === value ||
          (u.emailAddresses &&
            u.emailAddresses.find(
              (e) => e.emailAddress.substring(0, length).toLowerCase() === value
            ))
      );
      if (user) {
        setUser(user);
        setUserFound(userSearchMessageTypes.found);
      }
    }
  };
  
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
    setUserFound("");
    setUser(null);
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
                <form
                  onSubmit={handleSearch}
                  className="flex justify-between items-center"
                >
                  <input
                    value={search}
                    id="search"
                    onChange={handleChange}
                    className="text-xl md:text-5xl font-bold w-full bg-transparent outline-none placeholder-gray-400 text-green-500 py-4"
                    placeholder="Enter email or username..."
                    ref={searchRef}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    title="Search"
                  >
                    Search
                  </button>
                </form>
                <div className="h-max">
                  <h3 className="text-white py-4">{userFound}</h3>
                  <UserCard user={user} handleInvitation={handleInvitation} />
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
