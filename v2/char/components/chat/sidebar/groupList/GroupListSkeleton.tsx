import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const GroupListSkeleton = () => {
  return (
    <div>
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex h-[calc(8vh)] items-center justify-center space-x-4 rounded-none first:rounded-tr-xl"
          >
            <Skeleton className="bg-gray-200 dark:bg-gray-500 h-[calc(4vh)] w-[calc(4vh)] rounded-full" />
            <Skeleton className="h-[calc(4vh)] w-[150px]" />
          </div>
        ))}
    </div>
  );
};
