import React from "react";
import Image from "next/image";
import { IAvatarProps } from "@/types";

const Avatar = (props: IAvatarProps) => {
  if (props) {
    const { isStatus, size, imagePath, name } = props;
    return (
      <>
        <div className={`flex justify-center items-center flex-wrap rounded-full ml-2 
        ${isStatus && 'p-1 border-2 border-orange-500'} ${size === 50 ? 'w-10' : 'w-12'}`}>
          <Image
            className="rounded-full"
            width={size}
            height={size}
            src={imagePath ?? "/favicon.png"}
            alt={name}
            title={name}
          />
        </div>
      </>
    );
  } else return null;
}

export default Avatar
