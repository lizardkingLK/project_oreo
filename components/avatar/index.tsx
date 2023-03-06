import React from "react";
import Image from "next/image";

interface IAvatarProps {
  name: string,
  imagePath: string,
  size: number,
  isStatus?: boolean,
};

const Avatar = (props: IAvatarProps) => {
  if (props) {
    return (
      <>
        <div className={`flex justify-center items-center flex-wrap bg-black rounded-full ml-2 
        ${props.isStatus && 'p-1 border-2 border-orange-500'} ${props.size === 50 ? 'w-10' : 'w-12'}`}>
          <Image
            className="rounded-full"
            width={props.size}
            height={props.size}
            src={props.imagePath}
            alt={props.name}
            title={props.name}
          />
        </div>
      </>
    );
  } else return null;
}

export default Avatar