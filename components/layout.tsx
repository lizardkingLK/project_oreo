import React from "react";
import { Poppins } from "@next/font/google";
import { ILayoutProps } from "@/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = (props: ILayoutProps) => {
  return (
    <div className={poppins.className}>
      <div className="container">{props.children}</div>
    </div>
  );
};

export default Layout;
