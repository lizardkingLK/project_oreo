import UserCard from '@/components/cards/user';
import Spinner from '@/components/svgs/spinner';
import { IAddFriendProps } from '@/types';
import { userSearchMessageTypes } from '@/utils/enums';
import { createGroup, getUsers } from '@/utils/http';
import { useAuth } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import React, { useEffect, useRef, useState } from 'react';
import SectionLayout from '../../layout';

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
      <section className="flex h-screen items-center justify-center">
        <Spinner size={12} />
      </section>
    );
  }

  if (props) {
    const { onAddFriendHandler, onSelectGroupHandler, groups } = props;

    const handleInvitation = async () => {
      // if already friends start messaging
      const tempGroup = groups?.find((g) => g.targetId === user?.id);
      if (tempGroup) {
        onSelectGroupHandler(tempGroup.id);
        return;
      }
      // if not create group
      try {
        setLoading(true);
        const group = await createGroup({
          members: [{ memberId: userId! }, { memberId: user?.id! }],
          displayUrl: null,
          name: null,
          createdBy: userId!,
        });
        console.log(group);

        onAddFriendHandler(group);
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
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

    return (
      <SectionLayout title="Add Friend" isBackButton={Boolean(groups?.length)}>
        <form
          onSubmit={handleSearch}
          className="md:flex md:items-center md:justify-between"
        >
          <input
            value={search}
            id="search"
            onChange={handleChange}
            className="w-full bg-transparent py-4 text-xl font-bold text-green-500 placeholder-stone-400 outline-none md:text-5xl"
            placeholder="Enter email..."
            ref={searchRef}
            autoFocus={true}
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-stone-300 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-300 focus:outline-none focus:ring-4 focus:ring-stone-300 dark:border-stone-700 dark:bg-stone-400 dark:hover:bg-stone-500 dark:hover:text-white dark:focus:ring-stone-700 md:w-auto"
            title="Search"
          >
            Search
          </button>
        </form>
        <div className="h-max">
          <h3 className="py-4 text-black">{userFound}</h3>
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
