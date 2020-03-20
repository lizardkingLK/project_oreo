import React from 'react';
import {
    Button
} from 'reactstrap';

const a = require('../images/fashion_1.jpeg');
const b = require('../images/fashion_2.jpg');
const c = require('../images/fashion_3.jpg');
const bgs = [a,b,c];
let n = 0;

const Banner = (props) => {
    let banner = props.banner;
    (banner === true) ? banner = 'block' : banner = 'none';

    let handleBanner = (e) => {
        n += 1;
        if(n%3 === 0) n = 0;
        e.target.parentElement.parentElement.style.backgroundImage = `url(${bgs[n]})`;
    };

    return (
        <div id="banner" style={{display: banner, backgroundColor: "var(--primaryDark)"}}>
            <div id="banner_left" style={{height: "75vh", backgroundImage: "url("+a+")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundColor: "var(--primaryDark)",backgroundBlendMode: "lighten"}}>
                <Button onClick={handleBanner} className="btn btn-sm" color="outline-dark"><i className="fas fa-arrow-alt-circle-right"></i></Button>
            </div>
        </div>
    )
}

export default Banner;