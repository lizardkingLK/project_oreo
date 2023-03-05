import React from "react";

const Footer = () => {
  return (
    <footer className="px-2 py-4">
      <div className="xs:block md:flex flex-row">
        <div className="basis-1/4">
          <h1 className="brand text-md mb-4 text-white font-black">OREO &copy; {new Date().getFullYear()}</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
