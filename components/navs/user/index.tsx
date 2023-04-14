import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { IUserNavbarProps } from "@/types";
import { authStates } from '@/utils/enums';
import Image from 'next/image';
import Bars from '@/components/svgs/bars';

const UserNavbar = (props: IUserNavbarProps) => {
    if (props) {
        const { navbar, setNavbar, status } = props;
        return (
            <nav className={`absolute top-0 left-0 h-screen w-3/4 md:w-1/4 shadow-orange-500 shadow-2xl z-10 ${navbar ? "flex flex-col" : "hidden"} bg-gradient-to-r from-orange-500 to-orange-500`}>
                <div className='flex justify-center items-center p-4'>
                    <Image src={'/favicon.png'} alt='logo' width={50} height={50} priority />
                </div>
                {status === authStates.authenticated && (
                    <>
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
                {navbar && (
                    <button
                        className={`absolute left-full mt-8 ml-4 hover:text-orange-600 ${navbar ? "text-orange-800" : "text-white"
                            }`}
                        onClick={() => setNavbar(!navbar)}
                    >
                        <Bars />
                    </button>
                )}
            </nav>
        );
    } else return null;
}

export default UserNavbar