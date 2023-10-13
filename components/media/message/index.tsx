import React from 'react';
import Picture from '../../picture';
import { isLocalStorage, isImage } from '@/utils/helpers';

const MessageMedia = (props: { content: string }) => {
  const { content } = props;
  if (props) {
    if (isImage(content)) {
      const path = content.substring(
        content.indexOf('(') + 1,
        content.indexOf(')')
      );
      const src = isLocalStorage() ? `/uploads/${path}` : path;
      return (
        <div className="bg-gradient-to-r from-green-500 to-green-800 shadow-xl">
          <Picture alt="preview" height={140} width={140} src={src} />
        </div>
      );
    }
    return (
      <h1
        className="max-w-xs text-sm md:text-md text-white font-semibold md:font-bold text-ellipsis overflow-hidden"
        title={content}
      >
        {content}
      </h1>
    );
  } else return null;
};

export default MessageMedia;
