import { ISummaryCardLayoutProps } from '@/types'
import { elementType } from '@/utils/enums';
import React from 'react'

const SummaryCardLayout = (props: ISummaryCardLayoutProps) => {
    const { type, style, typeData, tooltip, children } = props;
    if (type === elementType.button) {
        return (
            <button className={style} onClick={typeData.clickEvent} title={tooltip}>
                {children}
            </button>
        );
    } else {
        return (
            <div className={style}>
                {children}
            </div>
        )
    }
}

export default SummaryCardLayout