import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { IUserNavbarProps } from "@/utils/types";
import { authStates } from '@/utils/enums';
import Image from 'next/image';

const UserNavbar = (props: IUserNavbarProps) => {
    if (props) {
        const { navbar, status } = props;
        return (
            <nav className={`absolute top-0 left-0 h-screen w-3/4 md:w-1/4 shadow-orange-500 shadow-2xl z-10 ${navbar ? "flex flex-col" : "hidden"} bg-gradient-to-r from-orange-500 to-orange-500`}>
                <div className='flex justify-center items-center p-4'>
                    <Image src={'/favicon.png'} alt='logo' width={50} height={50} />
                </div>
                {status === authStates.authenticated && (
                    <>
                        <button className="text-xl p-4 hover:text-white hover:bg-orange-600 font-medium">
                            Profile
                        </button>
                        <button className="text-xl p-4 hover:text-white hover:bg-orange-600 font-medium"
                            onClick={() => signOut()}
                        >
                            Logout
                        </button>
                    </>
                )}
                {status === authStates.unauthenticated && (
                    <button className="text-xl p-4 hover:text-white hover:bg-orange-600 font-medium"
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