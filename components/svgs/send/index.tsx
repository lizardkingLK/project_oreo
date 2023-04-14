import React from 'react'

const Send = ({ size }: { size: number | undefined }) => {
    const className = size ? `w-${size} h-${size}` : "w-7 h-7", strokeWidth = size ? 1.5 : 2;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
        </svg>
    )
}

export default Send