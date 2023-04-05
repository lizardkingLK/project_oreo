import { IPictureProps } from '@/utils/types';
import Image from 'next/image';
import React from 'react'

const Picture = (props: IPictureProps) => {
    if (props) {
        const { src, width, height, alt } = props;
        return (
            <Image src={src} width={width} height={height} alt={alt} />
        );

    } else return null;
}

export default Picture