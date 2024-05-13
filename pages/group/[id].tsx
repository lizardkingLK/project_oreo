import PageLayout from '@/components/oreo/layouts/page';
import { useRouter } from 'next/router';
import React from 'react';

const Group = () => {
  const router = useRouter();

  return (
    <PageLayout>
      <p>Group: {router.query.id}</p>
    </PageLayout>
  );
};

export default Group;
