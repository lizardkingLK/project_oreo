import React from 'react';
import {
    Button
} from 'reactstrap';

import Banner from './Banner';

const Showcase = (props) => {
    let title = props.title;
    let contents = props.contents;
    let blur = props.blur;
    let banner = props.banner;

    return (
        <div id="showcase" style={{filter: "blur("+blur+")"}}>
            <div id="showcase_card">
                <div className="row">
                    <div className="col-sm-6 d-flex flex-row mt-1">
                        <h1 className="display-3 txt_secondary text-left" id="showcase_title">{title}</h1>
                    </div>
                    <div className="col-sm-6 d-flex flex-row-reverse mt-4">
                        <small className="txt_secondary text-right">Oreo is a online shopping store made just for you.</small>
                    </div>
                </div>

                <div>
                    <Banner banner={banner} />
                    {
                        contents.map(cont => {
                            return (
                                <div className="item_card" key={cont._id}>
                                    <div className="itemC_left" style={{backgroundImage: "url("+cont.images[0]+")"}}>
                                        <div className="itemCL_imgBoxes">
                                            {cont.images.map( (image,index) => {
                                                return (
                                                    <div className="itemCL_imgBox" onClick={props.handleImageClick} key={index} style={{backgroundImage: "URL("+image+")"}}></div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="itemC_right">
                                        <div className="itemCR_subtitle">
                                            {cont.subcategories.map( (sub,index) => {
                                                return (
                                                    <small key={index}>&nbsp;{sub.toString().toUpperCase()}&nbsp;</small>
                                                )
                                            })}
                                        </div>
                                        <div className="itemCR_topA">
                                            <div className="itemCR_topA_title">{cont.name}</div>
                                            <div className="itemCR_topA_price">{cont.price}</div>
                                        </div>
                                        <div className="itemCR_topB">
                                            <div className="itemCR_topB_sizeSelect">Select Size</div>
                                                <div className="itemCR_topB_sizeGrid" style={{display: "grid", gridTemplateColumns: "auto auto auto", maxHeight: "10vh"}}>
                                                    {cont.sizes.map( (size,index) => {
                                                        return ( 
                                                            <div style={{textAlign: "center", margin: ".5vh 0 .5vh 0"}}>
                                                                <Button color="outline-dark" className="btn btn-sm" style={{color: "var(--primaryLight)"}} key={index}>{size}</Button>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                        </div>
                                        <div className="itemCR_topC">
                                            <Button color="dark" className="btn btn-sm itemCR_topC_addToCart">Add To Cart</Button>
                                            <Button color="light" className="btn btn-sm itemCR_topC_favourite">Favourite <i className="far fa-heart"></i></Button>
                                        </div>
                                        <div className="itemCR_topD">
                                            <small className="itemCR_topD_description">{cont.description}</small>
                                        </div>
                                        <div className="itemCR_topE">
                                            <a href={cont.storyUrl} className="itemCR_topE_readMore">Read More</a>
                                        </div>
                                        <div className="itemCR_topF">
                                            <div className="itemCR_topF_delivery">Free Delivery & Returns</div>
                                        </div>
                                        <div className="itemCR_topG">
                                            <div className="itemCR_topG_freeDelivery">Reviews (0)</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>   
            </div>
        </div>
    )
    
}

export default Showcase;