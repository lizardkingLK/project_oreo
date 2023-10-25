import { registerRealtime } from '@/lib/supabase';
import { tableNames } from '@/utils/enums';
import { useEffect, useState } from 'react';

const useRealtime = () => {
  const [changes, setChanges] = useState<null | object>(null);
  useEffect(() => {
    const handleInserts = (payload: object) => setChanges(payload);
    const realTimeChannel = registerRealtime(tableNames.message, handleInserts);
    return () => {
      realTimeChannel.unsubscribe();
    };
  });
  return changes;
};

export default useRealtime;
