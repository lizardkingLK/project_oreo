import React from 'react'

const Footer = () => {
    return (
        <footer className="bottom-0 flex flex-row bg-black p-2">
            <div className="basis-1/2">
                <h1 className='brand text-lg text-white font-bold'>&#169;Oreo {new Date().getFullYear()}</h1>
            </div>
            <div className='basis-1/2 flex flex-row align-middle justify-end'>
                Hello World
            </div>
        </footer>
    )
}

export default Footer