import { messagingType } from '@/utils/enums';
import { getMessagingMethod } from '@/utils/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AppRouter = () => {
  const router = useRouter();

  useEffect(() => {
    const method = getMessagingMethod();

    if (method === messagingType.local) {
      router.push('/lcl');
    } else if (method === messagingType.cloud) {
      router.push('/cld');
    }
  }, [router]);
};

export default AppRouter;
