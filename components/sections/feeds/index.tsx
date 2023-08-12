import React from "react";
import SectionLayout from "../layout";
import FeedList from "@/components/feeds";

const Feeds = (props: any) => {
  if (props) {
    const { feeds } = props;

    return (
      <SectionLayout title="Feeds">
        <div className="flex items-center">
          <FeedList feeds={feeds} />
        </div>
      </SectionLayout>
    );
  } else return null;
};

export default Feeds;
