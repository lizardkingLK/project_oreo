import React from "react";

const Navigation = () => {
  return (
    <nav className="flex flex-row bg-black p-4">
      <div className="basis-1/2">
        <h1 className="brand text-4xl text-white font-bold">
          <a href="/">
            OREO
          </a>
        </h1>
      </div>
      <ul className="basis-1/2 flex flex-row align-middle justify-end">
        <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
          <h1 className="text-lg text-black">
            <a href="#browse" title="Browse Items">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </a>
          </h1>
        </li>
        <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
          <h1 className="text-lg text-black">
            <a href="/cart" title="Checkout Items">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </a>
          </h1>
        </li>
        <li className="flex justify-center content-center flex-wrap ml-4 w-10 bg-green-300 rounded-full">
          <h1 className="text-lg text-black">
            <a href="/profile" title="Edit Profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </a>
          </h1>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
