import React from 'react'
import Close from '../svgs/close';
import { IDialogProps } from '@/types';

const Dialog = (props: IDialogProps) => {
    if (props) {
        const { dialogRef, dialogTitle, dialogSubtitle, dialogCloseHandler, children } = props;
        return (
            <div ref={dialogRef} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 shadow-black shadow-2xl w-2/4`}>
                <div className='flex justify-between items-center p-4'>
                    <h1 className="hidden md:block text-white text-md md:text-xl font-bold">{dialogTitle}</h1>
                    <h1 className="block md:hidden text-white text-md md:text-xl font-bold">{dialogSubtitle}</h1>
                    <button className='text-white' title='Cancel Attachment' onClick={dialogCloseHandler}>
                        <Close size={undefined} />
                    </button>
                </div>
                {children}
            </div>
        )
    } else return null;
}

export default Dialog