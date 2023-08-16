import React, { useEffect, useState } from "react";
import SectionLayout from "../layout";
import FeedList from "@/components/feeds";
import { useAuth } from "@clerk/nextjs";
import Spinner from "@/components/svgs/spinner";
import { apiUrls } from "@/utils/enums";

const Feeds = () => {
  const { isLoaded, userId } = useAuth();

  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const initializeFeeds = async (userId: string) => {
      await fetch(`${apiUrls.feed}?id=${userId}`)
        .then((response) => response.json())
        .then((data) => setFeeds(data));
    };

    if (userId) {
      initializeFeeds(userId);
    }
  }, [userId]);

  if (!isLoaded) {
    return (
      <section className="h-screen flex justify-center items-center">
        <Spinner size={12} />
      </section>
    );
  }

  return (
    <SectionLayout title="Feeds">
      <div className="flex items-center">
        <FeedList feeds={feeds} />
      </div>
    </SectionLayout>
  );
};

export default Feeds;
