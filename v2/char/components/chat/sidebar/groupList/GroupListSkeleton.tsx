import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const GroupListSkeleton = () => {
  return (
    <div>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex items-center space-x-4 px-4 pt-4 pb-4">
            <Skeleton className="bg-card/50 h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  );
};
