import React from 'react';

const Banner = (props) => {
    let banner = props.banner;
    (banner === true) ? banner = 'block' : banner = 'none';

    return (
        <div id="banner" style={{display: banner, backgroundColor: "var(--primaryAccent)"}}>
            <div id="banner_content" style={{
                height: "75vh",
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat",
                backgroundColor: "var(--primaryAccent)",
                backgroundBlendMode: "lighten"}}
            >
                
            </div>
        </div>
    )
}

export default Banner;