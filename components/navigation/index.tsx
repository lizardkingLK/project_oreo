import React from "react";
import Link from "next/link";

const Navigation = () => {
  const [navActive, setNavActive] = React.useState(false);

  const toggleNavigation = () => {
    setNavActive(!navActive);
  }

  return (
    <>
      <nav className="flex flex-row bg-black py-4 px-2">
        <div className="basis-1/2">
          <h1 className="brand text-4xl text-white font-bold">
            <Link href="/">OREO</Link>
          </h1>
        </div>
        <ul className="basis-1/2 hidden md:flex flex-row align-middle justify-end">
          <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
            <h1 className="text-lg text-black">
              <Link href="/messages/#messages" title="Message Friends">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </Link>
            </h1>
          </li>
          <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
            <h1 className="text-lg text-black">
              <Link href="/profile" title="Edit Profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            </h1>
          </li>
          <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
            <h1 className="text-lg text-black">
              <Link href="/dashboard" title="Manage Content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </h1>
          </li>
        </ul>
        <div className="basis-1/2 flex md:hidden items-center justify-end">
          <button className="text-white hover:text-green-300" onClick={toggleNavigation}>
            <h1 className="text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </h1>
          </button>
        </div>
      </nav>
      {/* mobile nav */}
      <nav className={`duration-150 ${navActive ? 'block' : 'hidden'}`}>
        <ul>
          <li>
            <Link href={'/messages'}>
              <h1 className="text-xl text-white font-bold hover:text-green-300 p-2">
                Messages
              </h1>
            </Link>
          </li>
          <li>
            <Link href={'/profile'}>
              <h1 className="text-xl text-white font-bold hover:text-green-300 p-2">
                Profile
              </h1>
            </Link>
          </li>
          <li>
            <Link href={'/dashboard'}>
              <h1 className="text-xl text-white font-bold hover:text-green-300 p-2">
                Dashboard
              </h1>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
