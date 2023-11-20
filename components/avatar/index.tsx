import React, { useState } from 'react';
import Image from 'next/image';
import { IAvatarProps } from '@/types';
import { classNames } from '@/utils/helpers';

const Avatar = (props: IAvatarProps) => {
  const [loading, setLoading] = useState(true);
  if (props) {
    const { isStatus, isOnline, size, imagePath, name } = props;
    return (
      <div
        className={classNames(
          'flex flex-wrap items-center justify-center rounded-full',
          loading ? 'blur-xl' : 'blur-0',
          isStatus ? 'border-2 border-stone-500 p-1' : '',
          size === 50 ? 'w-10' : 'w-12'
        )}
      >
        <Image
          className="rounded-full"
          width={size}
          height={size}
          src={imagePath ?? '/favicon.png'}
          alt={name}
          title={name}
          priority={true}
          blurDataURL={'/favicon.png'}
          onLoadingComplete={() => setLoading(false)}
        />
        {isOnline ? (
          <span className="absolute top-0 left-9 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-stone-800"></span>
        ) : null}
      </div>
    );
  } else return null;
};

export default Avatar;
