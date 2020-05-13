import React from 'react';

const Banner = (props) => {
    let banner = props.banner;
    (banner === true) ? banner = 'block' : banner = 'none';

    return (
        <div id="banner" style={{display: banner}}>
            <div id="banner_content">
                <div id="bannerC_left">

                </div>
                <div id="bannerC_right">
                    <h1 id="bannerCR_heading">Shop now</h1>
                    <p id="bannerCR_subHeading">With great prices</p>
                </div>
            </div>
        </div>
    )
}

export default Banner;