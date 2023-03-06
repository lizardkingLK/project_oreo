import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center md:justify-start">
      <h1 className="brand text-sm text-white">OREO &copy; {new Date().getFullYear()}</h1>
    </footer>
  );
};

export default Footer;
