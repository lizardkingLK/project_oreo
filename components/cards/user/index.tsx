import Avatar from '@/components/avatar';
import Spinner from '@/components/svgs/spinner';
import { IUserCardProps } from '@/types';
import { resourcePaths } from '@/utils/enums';
import React from 'react';

const UserCard = (props: IUserCardProps) => {
  if (props) {
    const { user, handleInvitation, loading } = props;

    if (!user) {
      return null;
    }

    return (
      <div className="w-full bg-s rounded-lg shadow">
        <div className="block md:flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="mr-4">
              <Avatar
                imagePath={user.imageUrl ?? resourcePaths.imageFavicon}
                name="default one"
                size={50}
              />
            </div>
            <div>
              <h5 className="text-xl font-medium text-stone-900 dark:text-black">
                {user.firstName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username}
              </h5>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {user?.emailAddresses?.at(0)?.emailAddress}
              </span>
            </div>
          </div>
          <div className="flex mt-4">
            <button
              className="focus:outline-none text-black bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex justify-center items-center w-full"
              onClick={handleInvitation}
            >
              {loading && (
                <div className="mr-2">
                  <Spinner size={6} />
                </div>
              )}
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default UserCard;
