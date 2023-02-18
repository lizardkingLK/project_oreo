import React from "react";
import Footer from "./footer";
import Navigation from "./navigation";

const Layout = (props) => {
  return (
    <>
      <div className="container">
        <Navigation />
      </div>
      <div className="container">{props.children}</div>
      <div className="bg-green-700">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
