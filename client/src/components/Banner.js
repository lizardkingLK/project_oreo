import React from 'react';

import SignUpWindow from './SignUpWindow';

const Banner = (props) => {
    let banner = props.banner;
    let authState = props.authState;
    let setAuthState = props.setAuthState;
    (banner === true) ? banner = 'block' : banner = 'none';

    return (
        <div id="banner" style={{display: banner}}>
            <div id="banner_content">
                <div id="bannerC_left">

                </div>
                <div id="bannerC_right">
                    <h1 id="bannerCR_heading">Shop now</h1>
                    <p id="bannerCR_subHeading">With great prices</p>
                    {(!authState)
                    ?
                    <SignUpWindow 
                        setAuthState={setAuthState} 
                        buttonLabel={"Join us"} 
                        className={"modal-dialog modal-lg"} 
                        linkStyle={"bannerCR_joinUs"}
                    />
                    :
                    <small id="bannerCR_welcome">Welcome {authState.name}</small>
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner;