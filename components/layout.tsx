import React, { Fragment } from "react";
import { ILayoutProps } from "@/types";

const Layout = (props: ILayoutProps) => {
  return (
    <Fragment>
      <div className="container">{props.children}</div>
    </Fragment>
  );
};

export default Layout;
