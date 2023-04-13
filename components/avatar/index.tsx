import React, { useState } from "react";
import Image from "next/image";
import { IAvatarProps } from "@/types";

const Avatar = (props: IAvatarProps) => {
  const [loading, setLoading] = useState(true);
  if (props) {
    const { isStatus, isOnline, size, imagePath, name } = props;
    return (
      <>
        <div className={`flex justify-center items-center flex-wrap rounded-full ml-2
        ${loading
            ? "blur-xl"
            : "blur-0"
          }
        ${isStatus
            ? 'p-1 border-2 border-orange-500'
            : ''}
        ${size === 50
            ? 'w-10'
            : 'w-12'}`}>
          <Image
            className="rounded-full"
            width={size}
            height={size}
            src={imagePath ?? "/favicon.png"}
            alt={name}
            title={name}
            priority={true}
            blurDataURL={'/favicon.png'}
            onLoadingComplete={() => setLoading(false)}
          />
          {isOnline
            ? <span className="top-0 left-9 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            : null
          }
        </div>
      </>
    );
  } else return null;
}

export default Avatar
