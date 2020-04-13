import React from 'react';

const Banner = (props) => {
    let banner = props.banner;
    (banner === true) ? banner = 'block' : banner = 'none';

    return (
        <div id="banner" style={{display: banner}}>
            <div id="banner_content">
                
            </div>
        </div>
    )
}

export default Banner;