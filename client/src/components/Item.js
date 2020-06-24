import React, { useState } from 'react';
import {
    Button,
    Collapse,
    Fade
} from 'reactstrap';

import SignInWindow from './SignInWindow';
import Reviews from './Reviews';

const Item = (props) => {
    const {
        cont,
        authState,
        setAuthState,
        getCartId,
        addToCart,
        getWishListId,
        addToWishList,
        getReviews,
        reviews
    } = props;
    const itemId = cont._id;
    const userId = authState?._id;
    let itemSize = '';

    const [fadeInA, setFadeInA] = useState(false);
    const [fadeInB, setFadeInB] = useState(false);
    const [fadeInC, setFadeInC] = useState(false);
    const [collapse, setCollapse] = useState(true);
    const toggleCollapse = () => setCollapse(!collapse);

    const handleImageClick = (e) => {
        const reqBg = e.target.style.backgroundImage;
        const target = e.target.parentElement.parentElement.nextElementSibling;
        target.style.backgroundImage = `${reqBg}`;
    }

    const handleAddToCart = async (e) => {
        if (itemSize) {
            if (fadeInA) setFadeInA(false);
            let cartId = '';

            // get cart id
            await getCartId(userId)
                .then(cId => {
                    cartId = cId;
                })

            // add to cart
            await addToCart(cartId, itemId, itemSize)
                .then(result => {
                    if (result)
                        setFadeInB(true);
                    else
                        setFadeInB(false);
                })
        }
        else {
            setFadeInA(true);
            setFadeInB(false);
            setCollapse(true);
        }
    }

    const handleAddToWishList = async (e) => {
        let wishListId = '';

        // get wishlist id
        await getWishListId(userId)
            .then(wId => {
                wishListId = wId;
            })

        // add to wishlist
        await addToWishList(wishListId, itemId)
            .then(result => {
                if (result)
                    setFadeInC(true);
                else
                    setFadeInC(false);
            })
    }

    const handleSize = async (i) => {
        if (!itemSize) {
            const size = cont.sizes[i];
            itemSize = size;
            setCollapse(true);
        }
        else
            setCollapse(false);
    }

    return (
        <div className="item_card">
            <div className="itemC_left">
                <div className="itemCL_imgBoxes">
                    {cont.images.map((image, index) => {
                        return (
                            <div className="itemCL_imgBox" onClick={handleImageClick} key={index} style={{ backgroundImage: "URL(" + image + ")" }}></div>
                        )
                    })}
                </div>
            </div>
            <div className="itemC_center" style={{ backgroundImage: "url(" + cont.images[0] + ")" }}>

            </div>
            <div className="itemC_right">
                <div className="itemCR_subtitle">
                    {cont.subcategories.map((sub, index) => {
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
                            className={"modal-dialog modal-md"}
                            message={"You have to sign in first!"}
                        />
                    </div>
                    :
                    <div className="itemCR_topC">
                        <Fade in={fadeInA} id="itemCR_topC_sizeSelectWarningContainer" style={{ margin: "0 1vh 0 1vh" }}>
                            <span className="badge badge-light">please set size!</span>
                        </Fade>
                        <Button color="dark" onClick={handleAddToCart} className="btn btn-sm itemCR_topC_addToCart">Add To Cart</Button>
                        <Button color="light" onClick={handleAddToWishList} className="btn btn-sm itemCR_topC_favourite">Favourite <i className="far fa-heart"></i></Button>
                    </div>
                }
                <div className="itemCR_topH" style={{ display: "row" }}>
                    <Fade in={fadeInB} id="itemCR_topH_message" >
                        <span className="badge badge-light">Added to cart</span>
                    </Fade>
                    <Fade in={fadeInC} id="itemCR_topH_message">
                        <span className="badge badge-light">Added to wishlist</span>
                    </Fade>
                </div>
                <div className="itemCR_topE">
                    <a href={cont.storyUrl} className="itemCR_topE_readMore">Read More</a>
                </div>
                <div className="itemCR_topF">
                    <div className="itemCR_topF_delivery">Free Delivery & Returns</div>
                </div>
                <div className="itemCR_topG">
                    <Reviews
                        authState={authState}
                        setAuthState={setAuthState}
                        btnClass={"itemCR_topG_reviews"}
                        item={cont}
                        buttonLabel={"Reviews"}
                        className={"modal-dialog modal-md"}
                        reviews={reviews}
                        getReviews={getReviews}
                    />
                </div>
                <div className="itemCR_topB">
                    <div className="itemCR_topB_sizeSelect" onClick={toggleCollapse}>Select Size <i className="fa fa-angle-right"></i></div>
                    <Collapse isOpen={collapse}>
                        <div className="itemCR_topB_sizeGrid">
                            {cont.sizes.map((size, index) => {
                                return (
                                    <div key={index} style={{ textAlign: "center", margin: ".5vh 0 .5vh 0" }}>
                                        <Button key={index} onClick={() => handleSize(index)} color="outline-dark" className="btn btn-sm"
                                            style={{ color: "var(--primaryLight)", width: "80px" }}>
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