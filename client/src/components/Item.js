import React, { useState } from 'react';
import {
    Button,
    Collapse,
    Fade
} from 'reactstrap';

import SignInWindow from './SignInWindow';

const Item = (props) => {
    const { cont, authState, setAuthState, getCartId, addToCart } = props;
    const itemId = cont._id;
    const userId = authState?._id;
    let itemSize = '';

    const [fadeInA, setFadeInA] = useState(false);
    const [fadeInB, setFadeInB] = useState(false);
    const [collapse, setCollapse] = useState(true);
    const toggleCollapse = () => setCollapse(!collapse);

    const handleImageClick = (e) => {
        const reqBg = e.target.style.backgroundImage;
        const parent = e.target.parentElement.parentElement;
        parent.style.backgroundImage = `${reqBg}`;
    }

    const handleAddToCart = async (e) => {
        if(itemSize) {
            if(fadeInA) setFadeInA(false);
            let cartId = '';

            // get cart id
            await getCartId(userId)
            .then(cId => {
                cartId = cId;
            })
            
            // add to cart
            await addToCart(cartId,itemId,itemSize)
            .then(result => {
                if(result)
                    setFadeInB(true);
                else
                    setFadeInB(false);
            })

            console.log('USER_ID   '+userId);
            console.log('CART_ID   '+cartId);
            console.log('ITEM_ID   '+itemId);
            console.log('ITEM_SIZE '+itemSize);
        }
        else {
            setFadeInA(true);
            setFadeInB(false);
            setCollapse(true);
        }
    }

    const handleSize = async (i) => {
        if(!itemSize) {
            const size = cont.sizes[i];
            itemSize = size;
            setCollapse(true);
        }
        else
            setCollapse(false);
    }

    return (
        <div className="item_card">
            <div className="itemC_left" style={{backgroundImage: "url("+cont.images[0]+")"}}>
                <div className="itemCL_imgBoxes">
                    {cont.images.map( (image,index) => {
                        return (
                            <div className="itemCL_imgBox" onClick={handleImageClick} key={index} style={{backgroundImage: "URL("+image+")"}}></div>
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
                <div className="itemCR_topD">
                    <small className="itemCR_topD_description">{cont.description}</small>
                </div>
                {(!userId)
                ?
                <div className="itemCR_topC">
                    <SignInWindow
                        scrollable={false}
                        setAuthState={setAuthState} 
                        buttonLabel={"Add To Cart"} 
                        className={"modal-dialog modal-lg"}
                        message={"You have to sign in first!"}
                    />
                </div>
                :
                <div className="itemCR_topC">
                    <Fade in={fadeInA} id="itemCR_topC_sizeSelectWarningContainer" style={{margin: "0 2vh 0 0"}}>
                        <span className="badge badge-light">please set size!</span>
                    </Fade>
                    <Button color="dark" onClick={handleAddToCart} className="btn btn-sm itemCR_topC_addToCart">Add To Cart</Button>
                    <Button color="light" className="btn btn-sm itemCR_topC_favourite">Favourite <i className="far fa-heart"></i></Button>
                </div>
                }
                <div className="itemCR_topH" style={{height: "5vh", margin: "0 0 0 2vh"}}>
                    <Fade in={fadeInB} id="itemCR_topH_message">
                        <span className="badge badge-light">Added to cart</span>
                    </Fade>
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
                <div className="itemCR_topB">
                    <div className="itemCR_topB_sizeSelect" onClick={toggleCollapse}>Select Size <i className="fa fa-angle-right"></i></div>
                    <Collapse isOpen={collapse}>
                        <div className="itemCR_topB_sizeGrid">
                            {cont.sizes.map( (size,index) => {
                                return ( 
                                    <div key={index} style={{textAlign: "center", margin: ".5vh 0 .5vh 0"}}>
                                        <Button key={index} onClick={() => handleSize(index)} color="outline-dark" className="btn btn-sm"
                                        style={{color: "var(--primaryLight)", width: "80px"}}>
                                            <small>{size}</small>
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

export default Item;