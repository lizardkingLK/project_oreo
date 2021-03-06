import React, { useState }  from 'react';
import {
    Fade,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import SignInWindow from './SignInWindow';
import Reviews from './Reviews';

const WindowItem = (props) => {
    const { 
        item, 
        authState, 
        setAuthState, 
        getCartId,
        addToCart,
        itemSize,
        setItemSize,
        getWishListId,
        addToWishList,
        reviews,
        getReviews
    } = props;
    const itemId = item._id;
    let img = item.images[0];
    let userId = authState?._id;

    const [fadeInA, setFadeInA] = useState(false);
    const [fadeInB, setFadeInB] = useState(false);
    const [fadeInC, setFadeInC] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleImages = (e,i) => {
        let parent = e.target.parentElement.parentElement.previousElementSibling;
        parent.style.backgroundImage = `URL(${i})`;
    }

    const handleChangeSize = async (i) => {
        if(!itemSize) {
            const size = item.sizes[i];
            setItemSize(size);
            setFadeInA(false);
        }
        console.log(itemSize);
    }

    const handleAddToWishList = async (e) => {
        let wishListId = '';

        // get wishlist id
        await getWishListId(userId)
        .then(wId => {
            wishListId = wId;
        })

        // console.log('USER_ID   '+userId);
        // console.log('WISHLIST_ID   '+wishListId);
        // console.log('ITEM_ID   '+itemId);

        // add to wishlist
        await addToWishList(wishListId,itemId)
        .then(result => {
            if(result)
                setFadeInC(true);
            else
                setFadeInC(false);
        })
    }

    const handleAddToCart = async (e) => {
        console.log(itemSize);

        if(itemSize) {
            if(fadeInB) setFadeInB(false);
            if(fadeInA) setFadeInA(false);
            let cartId = '';

            await getCartId(userId)
            .then(cId => {
                cartId = cId;
            })

            await addToCart(cartId,itemId,itemSize)
            .then(result => {
                if(result)
                    setFadeInB(true);
                else
                    setFadeInB(false);
            })

            setItemSize('');
        }
        else
            setFadeInA(true);
    }

    return (
        <div className="itemWindowRTopB_item">
            <div className="itemWindowRTopBI_topA" style={{backgroundImage: "URL("+img+")"}}>
                <h3 className="itemWindowRTopBITopA_name">{item.name}</h3>
                <h5 className="itemWindowRTopBITopA_category">
                {item.subcategories.map( (sub,index) => {
                    return (
                        <small key={index}>&nbsp;{sub.toString()}&nbsp;</small>
                    )
                })}
                </h5>
            </div>
            <div className="itemWindowRTopBI_topB">
                <div className="itemWindowRTopBITopB_left">
                    <div className="itemWindowRTopBITopBA_priceContainer">
                        <h3 className="itemWindowRTopBITopBA_price">{item.price}</h3>
                        <Reviews 
                            authState={authState}
                            setAuthState={setAuthState} 
                            btnClass={"itemCR_topG_reviews"}
                            item={item} 
                            buttonLabel={"Reviews"} 
                            className={"modal-dialog modal-md"}
                            reviews={reviews}
                            getReviews={getReviews}
                         />
                    </div>
                    <div className="itemWindowRTopBITopBA_ratingContainer">
                        {/* GETS RATINGS */}
                        {/* <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small> */}
                    </div>
                </div>
                <div className="itemWindowRTopBITopB_right">
                    {item.images.map( (img,index) => {
                        return (
                            <small key={index} onMouseOver={(e) => handleImages(e,img)} className="itemWindowRTopBITopBR_image">{index+1}</small>
                        )
                    })}
                </div>
            </div>
            <div className="itemWindowRTopBI_topC">
                <div className="itemWindowRTopBITopC_A">
                    {(!userId)
                    ?
                    <SignInWindow
                        scrollable={false}
                        setAuthState={setAuthState} 
                        buttonLabel={"Add To Cart"}
                        className={"modal-dialog modal-lg"}
                        message={"You have to sign in first!"}
                    />
                    :
                    <div className="itemWindowRTopBITopCA_cart" onClick={handleAddToCart}>ADD TO CART</div>
                    }
                    <div className="itemWindowRTopBITopCA_message">
                        {/* MESSAGE ASKS ENTER SIZE */}
                        <Fade in={fadeInA} id="itemCR_topC_sizeSelectWarningContainer" style={{margin: "0 1vh 0 1vh"}}>
                            <span className="badge badge-light txt_secondary">please set size!</span>
                        </Fade>
                        <Dropdown className="itemWindowRTopBITopCA_sizeSelect" group isOpen={dropdownOpen} size="sm" toggle={toggleDropdown}>
                            <DropdownToggle className="itemWindowRTopBITopCASS_A" caret>Select size</DropdownToggle>
                            <DropdownMenu className="itemWindowRTopBITopCASS_B">
                                {item.sizes.map( (s,index) => {
                                    return (
                                        <DropdownItem className="itemWindowRTopBITopCASS_C" onClick={() => handleChangeSize(index)} key={index}>{s}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="itemWindowRTopBITopC_B">
                    {(!userId)
                    ?
                    <SignInWindow
                        scrollable={false}
                        setAuthState={setAuthState} 
                        buttonLabel={"Favourite"}
                        className={"modal-dialog modal-lg"}
                        message={"You have to sign in first!"}
                    />
                    :
                    <p className="itemWindowRTopBITopCB_wishlist" onClick={handleAddToWishList}>Favourite <i className="itemWindowRTopBITopCB_wishlistA far fa-heart"></i></p>
                    }
                    <div className="itemWindowRTopBITopCB_messageContainer">
                        <Fade in={fadeInB} className="itemWindowRTopBITopCBMC_A">
                            <span className="badge badge-light itemWindowRTopBITopCBMCA_message">Added to cart</span>
                        </Fade>
                        <Fade in={fadeInC} className="itemWindowRTopBITopCBMC_B">
                            <span className="badge badge-light itemWindowRTopBITopCBMCB_message">Added to wishlist</span>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WindowItem;