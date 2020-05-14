import React from 'react';

import Banner from './Banner';
import Item from './Item';

const Showcase = (props) => {
    let showcase = props.showcase;
    let title = props.title;
    let contents = props.contents;
    let blur = props.blur;
    let banner = props.banner;

    (showcase === true) ? showcase = 'block' : showcase = 'none';

    return (
        <div id="showcase" style={{display: showcase, filter: "blur("+blur+")"}}>
            <div id="showcase_card">
                <div className="row">
                    <div className="col-sm-12 d-flex flex-row mt-1">
                        <h1 className="display-3 txt_secondary text-left" id="showcase_title">{title}</h1>
                    </div>
                </div>

                <div>
                    <Banner banner={banner} />
                    {
                        contents.map(cont => {
                            return (
                                <Item key={cont._id} cont={cont} />
                            )
                        })
                    }
                </div>   
            </div>
        </div>
    )
    
}

export default Showcase;