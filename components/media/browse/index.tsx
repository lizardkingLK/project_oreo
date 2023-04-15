import { IBrowseMediaProps } from '@/types';
import React from 'react'
import Picture from '../../picture';

const BrowseMedia = (props: IBrowseMediaProps) => {
    const { type, pictureProps } = props;
    if (props) {
        switch (type) {
            case "image/png":
            case "image/jpeg":
                return <Picture {...pictureProps} />;
            default:
                return null;
        }
    } else return null;
}

export default BrowseMedia