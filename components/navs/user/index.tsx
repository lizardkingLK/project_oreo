import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { IUserNavbarProps } from "@/utils/types";
import { authStates } from '@/utils/enums';

const UserNavbar = (props: IUserNavbarProps) => {
    if (props) {
        const { navbar, status } = props;
        return (
            <nav className={`${navbar ? "flex flex-col" : "hidden"} mx-4 absolute top-20 bg-gradient-to-r from-orange-500 to-orange-500 rounded-md`}>
                {status === authStates.authenticated && (
                    <>
                        <button className="text-xl w-72 py-4 hover:text-white hover:bg-gray-900 font-medium rounded-t-md">
                            Profile
                        </button>
                        <button className="text-xl w-72 py-4 hover:text-white hover:bg-gray-900 font-medium rounded-b-md"
                            onClick={() => signOut()}
                        >
                            Logout
                        </button>
                    </>
                )}
                {status === authStates.unauthenticated && (
                    <button className="text-xl w-72 py-4 hover:text-white hover:bg-gray-900 font-medium rounded-md"
                        onClick={() => signIn()}
                    >
                        Login
                    </button>
                )}
            </nav>
        );
    } else return null;
}

export default UserNavbar