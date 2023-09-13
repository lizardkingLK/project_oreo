import React, { useEffect, useState } from 'react';
import SectionLayout from '../layout';
import FeedList from '@/components/feeds';
import { useAuth } from '@clerk/nextjs';
import Spinner from '@/components/svgs/spinner';
import { getFeeds } from '@/utils/http';
import { IFeedProps } from '@/types';

const Feeds = () => {
  const { isLoaded, userId } = useAuth();

  const [feeds, setFeeds] = useState<IFeedProps[]>([]);

  useEffect(() => {
    if (userId) {
      getFeeds(userId).then((data) => setFeeds(data));
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
