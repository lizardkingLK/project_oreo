import { ISectionLayoutProps } from "@/types";
import React from "react";

const SectionLayout = (props: ISectionLayoutProps) => {
  if (props) {
    const { title, children } = props;
    return (
      <section className="flex justify-center">
        <div
          className={
            "bg-black md:bg-transparent md:relative md:block container p-4"
          }
        >
          {title && (
            <h1 className="text-2xl text-white font-bold py-4" id="textTitle">
              {title}
            </h1>
          )}
          {children}
        </div>
      </section>
    );
  } else return null;
};

export default SectionLayout;
