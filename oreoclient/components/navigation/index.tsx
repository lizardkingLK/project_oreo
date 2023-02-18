import React from 'react'

const Navigation = () => {
    return (
        <nav className="flex flex-row bg-black p-2">
            <div className="basis-1/2">
                <h1 className='brand text-4xl text-white font-bold'>OREO</h1>
            </div>
            <ul className='basis-1/2 flex flex-row align-middle justify-end'>
                <li className='mx-4'>
                    <a href='/'>
                        <h1 className='text-3xl text-white'>Home</h1>
                    </a>
                </li>
                <li className='mx-4'>
                    <a href='#browse'>
                        <h1 className='text-3xl text-white'>Browse</h1>
                    </a>
                </li>
                <li className='mx-4'>
                    <a href='#contact'>
                        <h1 className='text-3xl text-white'>Contact</h1>
                    </a>
                </li>
                <li className='flex justify-center content-center flex-wrap mx-4 w-10 bg-green-300 rounded-full'>
                    <a href='/cart'>
                        <h1 className='text-lg text-black'><i className="fa-solid fa-cart-shopping"></i></h1>
                    </a>
                </li>
                <li className='flex justify-center content-center flex-wrap mx-4 w-10 bg-green-500 rounded-full'>
                    <a href='/profile'>
                        <h1 className='text-lg text-white'><i className="fas fa-user"></i></h1>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation