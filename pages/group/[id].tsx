import GroupLayout, { useGroup } from '@/components/oreo/layouts/group';
import PageLayout from '@/components/oreo/layouts/page';
import { useRouter } from 'next/router';
import React from 'react';

const Group = () => {
  const router = useRouter();
  const { group } = useGroup();

  return (
    <PageLayout>
      <GroupLayout>
        <p>
          Group: {router.query.id} {group?.description}
        </p>
      </GroupLayout>
    </PageLayout>
  );
};

export default Group;
