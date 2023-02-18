import React from 'react'
import Footer from './footer'
import Navigation from './navigation'

const Layout = (props) => {
    return (
        <>
            <div className='container'>
                <Navigation />
            </div>
            <div className='container'>
                {props.children}
            </div>
            <div className='container'>
                <Footer />
            </div>
        </>
    )
}

export default Layout