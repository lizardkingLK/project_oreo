import React, { Fragment } from "react";
import Avatar from "@/components/avatar";
import { IFeedListProps } from "@/types";

const FeedList = (props: IFeedListProps) => {
  if (props) {
    const { feeds } = props;
    return (
      <Fragment>
        {feeds &&
          feeds.map((feed, index) => (
            <button key={index}>
              <Avatar
                name={feed.name}
                imagePath={feed.imagePath}
                size={50}
                isStatus={feed.isStatus}
              />
            </button>
          ))}
      </Fragment>
    );
  } else return null;
};

export default FeedList;
