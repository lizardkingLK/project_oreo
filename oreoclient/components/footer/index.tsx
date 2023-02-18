import React from "react";

const Footer = () => {
  return (
    <footer className="px-2 py-4">
      <div className="flex flex-row">
        <div className="basis-1/4">
          <h1 className="brand text-4xl mb-4 text-black font-black">OREO</h1>
          <p className="text-lg text-white font-bold">"You get T-Shirts."</p>
        </div>
        <div className="basis-1/4">
          <h1 className="text-xl mb-4 text-black font-black underline">
            EXPLORE
          </h1>
          <ul>
            <li>
              <a href="#browse">
                <p className="text-lg text-gray-300 hover:text-gray-50  font-bold">
                  Browse
                </p>
              </a>
            </li>
            <li>
              <a href="#cart">
                <p className="text-lg text-gray-300 hover:text-gray-50  font-bold">
                  Cart
                </p>
              </a>
            </li>
            <li>
              <a href="#create">
                <p className="text-lg text-gray-300 hover:text-gray-50  font-bold">
                  Create
                </p>
              </a>
            </li>
          </ul>
        </div>
        <div className="basis-1/4">
          <h1 className="text-xl mb-4 text-black font-black underline">
            FOLLOW US
          </h1>
          <div className="flex">
            <a href="https://www.instagram.com" className="mr-4">
              <p className="text-lg text-gray-300 hover:text-gray-50 font-bold">
                <i className="fa-brands fa-instagram"></i>
              </p>
            </a>
            <a href="https://www.reddit.com" className="mr-4">
              <p className="text-lg text-gray-300 hover:text-gray-50 font-bold">
                <i className="fa-brands fa-reddit-alien"></i>
              </p>
            </a>
            <a href="https://www.tiktok.com" className="mr-4">
              <p className="text-lg text-gray-300 hover:text-gray-50 font-bold">
                <i className="fa-brands fa-tiktok"></i>
              </p>
            </a>
            <a href="https://www.twitter.com" className="mr-4">
              <p className="text-lg text-gray-300 hover:text-gray-50 font-bold">
                <i className="fa-brands fa-twitter"></i>
              </p>
            </a>
          </div>
        </div>
        <div className="basis-1/4">
          <h1 className="text-xl mb-4 text-black font-black underline">More</h1>
          <a href="/faq" className="mr-4">
            <p className="text-lg text-gray-300 hover:text-gray-50 font-bold">
              FAQ
            </p>
          </a>
        </div>
      </div>
      <div className="flex flex-wrap content-center my-8">
        <div className="basis-1/4">
          <input
            className="py-4 shadow appearance-none border-b-2 border-white w-full bg-transparent text-black leading-tight focus:outline-none focus:shadow-outline font-bold"
            id="email"
            type="email"
            placeholder="Enter email address"
          />
        </div>
        <div className="basis-1/4">
          <button
            className="p-4 bg-green-700 hover:bg-green-900 text-white font-bold focus:outline-none focus:shadow-outline"
            type="button"
          >
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
