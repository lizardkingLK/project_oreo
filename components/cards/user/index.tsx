import Avatar from "@/components/avatar";
import { User } from "@clerk/nextjs/dist/types/server";
import React, { MouseEventHandler } from "react";

const UserCard = ({
  user,
  handleInvitation,
}: {
  user: undefined | null | User;
  handleInvitation: MouseEventHandler;
}) => {
  if (!user) {
    return null;
  }

  return (
    <div className="w-full bg-black rounded-lg shadow">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="mr-4">
            <Avatar imagePath={user.imageUrl ?? "/favicon.png"} name="default one" size={50} />
          </div>
          <div>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              {user.firstName
                ? `${user.firstName} ${user.lastName}`
                : user.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.emailAddresses && user.emailAddresses[0].emailAddress}
            </span>
          </div>
        </div>
        <div className="flex">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleInvitation}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
