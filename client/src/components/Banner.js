import React from 'react';

const Banner = (props) => {
    let banner = props.banner;

    (banner === true) ? banner = 'block' : banner = 'none';

    return (
        <div id="banner" style={{display: banner}}>
            Hello
        </div>
    )
}

export default Banner;