import React from "react";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = (props) => {
  return (
    <div className={poppins.className}>
      <div className="container">{props.children}</div>
    </div>
  );
};

export default Layout;
