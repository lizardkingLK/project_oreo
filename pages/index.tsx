import { messagingType } from '@/utils/enums';
import { getMessagingMethod } from '@/utils/helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AppRouter = () => {
    const router = useRouter();

    useEffect(() => {
        const method = getMessagingMethod();

        if (method === messagingType.sockets) {
            router.push("/sockets");
        } else if (method === messagingType.ably) {
            router.push("/ably");
        }
    }, [router]);
}

export default AppRouter;