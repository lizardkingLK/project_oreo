import React from 'react'
import Picture from '../../picture';
import { isImage, isMedia } from '@/utils/helpers';

const MessageMedia = (props: { content: string }) => {
    const { content } = props;
    if (props) {
        if (isMedia(content)) {
            if (isImage(content)) {
                return <Picture
                    alt='preview' height={120} width={120}
                    src={`/uploads/${content.substring(content.indexOf('(') + 1, content.indexOf(')'))}`} />;
            }
        }
        return <h1 className="max-w-xs text-md text-black font-bold">{content}</h1>
    } else return null;
}

export default MessageMedia