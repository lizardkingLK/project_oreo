import React from 'react';
import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Avatar = () => {
  return (
    <ShadAvatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </ShadAvatar>
  );
};
