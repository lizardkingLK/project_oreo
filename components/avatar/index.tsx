import React from "react";
import Image from "next/image";

interface IAvatarProps {
  imagePath: string,
  size: number,
  isOnline: boolean
};

export default function Avatar(props: IAvatarProps) {
  if (props) {
    const [widthStyles] = React.useState(props.size === 50 ? 'w-10' : 'w-12');
    const [onlineStyles] = React.useState(props.isOnline ? 'p-1 border-2 border-red-500' : null);

    return (
      <div className={`flex justify-center items-center flex-wrap bg-black rounded-full ml-2 ${onlineStyles} ${widthStyles}`}>
        <Image
          className="rounded-full"
          width={props.size}
          height={props.size}
          src={props.imagePath}
          alt="avatar_image"
          title="avatar_image"
        />
      </div>
    );
  }
}
