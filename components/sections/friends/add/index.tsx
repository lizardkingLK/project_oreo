import UserCard from '@/components/cards/user';
import Spinner from '@/components/svgs/spinner';
import { userSearchMessageTypes } from '@/utils/enums';
import { useAuth } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import React, { useEffect, useRef, useState } from 'react';
import SectionLayout from '../../layout';
import { IAddFriendProps } from '@/types';
import { getUsers, inviteFriend } from '@/utils/http';
import { formatCompactNumber } from '@/utils/helpers';

const AddFriend = (props: IAddFriendProps) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<null | User[]>(null);
  const [user, setUser] = useState<null | User>();
  const [userFound, setUserFound] = useState('');
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  if (!isLoaded) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Spinner size={12} />
      </section>
    );
  }

  if (props) {
    const { onAddFriendHandler, onSelectGroupHandler, groups } = props;

    const handleInvitation = async () => {
      const tempGroup = groups?.find((g) => g.targetId === user?.id);
      if (tempGroup) {
        onSelectGroupHandler(tempGroup.id);
        return;
      }
      setLoading(true);
      inviteFriend(userId, user?.id).then((data) => {
        if (data) {
          setLoading(false);
          onAddFriendHandler(data[0]);
        }
      });
    };

    const handleSearch = (event: { preventDefault: () => void }) => {
      event.preventDefault();
      const value = searchRef?.current?.value ?? '',
        length = value.length;
      setUserFound(userSearchMessageTypes.notFound);
      if (users && value) {
        const user = users.find(
          (u) =>
            u.id !== userId &&
            (u.username?.substring(0, length).toLowerCase() ===
              value.toLowerCase() ||
              u?.emailAddresses.find(
                (e) =>
                  e.emailAddress.substring(0, length).toLowerCase() ===
                  value.toLowerCase()
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
      setUserFound('');
      setUser(null);
    };

    const usersCount = formatCompactNumber(
      users?.length.toString() ?? null
    ).toString();

    return (
      <SectionLayout
        title="Add Friend"
        content={usersCount}
        tooltip={`${usersCount} users available`}
      >
        <form
          onSubmit={handleSearch}
          className="md:flex md:justify-between md:items-center"
        >
          <input
            value={search}
            id="search"
            onChange={handleChange}
            className="text-xl md:text-5xl font-bold w-full bg-transparent outline-none placeholder-stone-400 text-green-500 py-4"
            placeholder="Enter email..."
            ref={searchRef}
            autoFocus={true}
            required
          />
          <button
            type="submit"
            className="text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-4 focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-stone-800 dark:hover:bg-stone-700 dark:focus:ring-stone-700 dark:border-stone-700 w-full md:w-auto"
            title="Search"
          >
            Search
          </button>
        </form>
        <div className="h-max">
          <h3 className="text-white py-4">{userFound}</h3>
          <UserCard
            user={user}
            handleInvitation={handleInvitation}
            loading={loading}
          />
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default AddFriend;
