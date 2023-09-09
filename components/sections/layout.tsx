import { ISectionLayoutProps } from "@/types";
import React from "react";
import Badge from "../badge";

const SectionLayout = (props: ISectionLayoutProps) => {
  if (props) {
    const { title, content, tooltip, children } = props;
    return (
      <section className="flex justify-center">
        <div
          className={
            "bg-black md:bg-transparent md:relative md:block container p-4"
          }
        >
          <div className="flex justify-between items-center">
            {title && (
              <h1 className="text-2xl text-white font-bold py-4" id="textTitle">
                {title}
              </h1>
            )}
            {content && tooltip && (
              <Badge text={content} tooltip={tooltip} />
            )}
          </div>
          {children}
        </div>
      </section>
    );
  } else return null;
};

export default SectionLayout;
