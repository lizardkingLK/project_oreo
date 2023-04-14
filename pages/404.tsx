import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Error = () => {
    return (
        <>
            <div className="m-20 text-center">
                <Image
                    width={150}
                    height={150}
                    src={"/logo.png"}
                    alt={"hero logo"}
                />
            </div>
            <h1 className='m-20 text-5xl md:text-8xl text-white font-black'>
                Page Not Found
            </h1>
            <h1 className='m-20 text-5xl text-white font-black underline'>
                <Link href='/'>
                    Back to Home
                </Link>
            </h1>
        </>
    )
}

export default Error