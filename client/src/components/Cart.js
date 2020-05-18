import React, { useState } from 'react';
import {
    Collapse,
    Fade
} from 'reactstrap';

import SignInWindow from './SignInWindow';
import SignUpWindow from './SignUpWindow';

const Cart = (props) => {
    let { 
        cart,
        authState,
        setAuthState,
        getCartId,
        cartItems, 
        cartTotal, 
        removeFromCart
    } = props;
    let fadeIn = '';

    if(cart === true) {
        if(window.innerWidth > 600)
            cart = 'flex';
        else
            cart = 'block';

        fadeIn = true;
    }
    else {
        cart = 'none';
        fadeIn = false;
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => setIsOpen(!isOpen);

    const handleRemoveFromCart = async (index) => {
        let cartId = '';

        await getCartId(authState._id)
        .then(cId => {
            cartId = cId;
        })

        removeFromCart(cartId,index);
    }

    return (
        <Fade in={fadeIn} id="cart" style={{display: cart}}>
            <div id="cart_left">
                <div id="cartL_topA">
                    <h4 id="cartLTopA_heading">Cart</h4>
                    {(!authState)
                    ?
                    <small id="cartLTopA_message">There are no items in your cart.</small>
                    :
                    <h3 id="cartLTopA_message">{cartItems.length} <sup>items</sup></h3>
                    }
                </div>
                <div id="cartL_topB">
                    {(!authState)
                    ?
                    <div id="cartLTopB_messageContainer">
                        <h3 id="cartLTopBMC_message">No Items added :(</h3>
                    </div>
                    :
                    <div id="cartLTopB_cartItemContainer">
                        {cartItems.map( (ci,index) => {
                            return (
                                <div key={index} className="cartLTopBCIC_cartItem">
                                    <div className="cartLTopBCICCI_image" style={{backgroundImage: "url("+ci.item.images[0]+")"}}></div>
                                    <div className="cartLTopBCICCI_detailsA">
                                        <h4 className="cartLTopBCICCIDA_name">{ci.item.name}</h4>
                                        <div className="cartLTopBCICCIDA_subCategories">
                                            {ci.item.subcategories.map((sc,i) => {
                                                return (
                                                    <p className="cartLTopBCICCIDASCs_subCategory" key={i}>{sc}</p>
                                                )
                                            })}
                                        </div>
                                        <div className="cartLTopBCICCIDA_size">
                                            <h5 className="cartLTopBCICCIDAS_sizeA">Selected Size</h5>
                                            <h5 className="cartLTopBCICCIDAS_sizeB">{ci.itemSize}</h5>
                                        </div>
                                        <div className="cartLTopBCICCIDA_price">
                                            <h5 className="cartLTopBCICCIDAP_priceB">{ci.item.price}</h5>
                                        </div>
                                        <div className="cartLTopBCICCIDA_option">
                                            <p onClick={() => handleRemoveFromCart(index)} className="cartLTopBCICCIDAO_optionA">Remove <i className="fas fa-minus-circle"></i></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
                <div id="cartL_topC">
                    <h5 id="cartLTopC_heading">Wishlist</h5>
                </div>
                <div id="cartL_topD">
                    {(!authState)?
                        <small id="cartLTopD_emptyMsg">
                            Want to view your favourites? 
                            <SignUpWindow setAuthState={setAuthState} buttonLabel={"Join us"} className={"modal-dialog modal-lg"} /> 
                            or 
                            <SignInWindow setAuthState={setAuthState} buttonLabel={"SignIn"} className={"modal-dialog modal-lg"} />
                        </small>
                        :
                        <small id="cartLTopD_titleMsg">
                            Wishlist for {authState.name}
                        </small>
                    }
                    {/* ALL WISHLIST ITEMS */}
                </div>
            </div>
            <div id="cart_right">
                <div id="cartR_topA">
                    <h4 id="cartRTopA_heading">Summary</h4>
                </div>
                <div id="cartR_topB">
                    <div id="cartRTopB_promo">
                        <Collapse isOpen={isOpen}>
                            <div id="cartRTopBP_A" className="input-group" style={{zIndex: "2"}}>
                                <input id="cartRTopBPA_input" type="text" className="form-control" placeholder="enter promo here" aria-label="promoCode" aria-describedby="promoCode_input" />
                                <div id="cartRTopBPA_apply" className="input-group-append">
                                    <button id="cartRTopBPA_applyBtn" className="btn btn-outline-dark" type="button">Apply</button>
                                </div>
                            </div>
                        </Collapse>
                        <p id="cartRTopBP_B" style={{cursor: "pointer"}} onClick={toggleCollapse}>Do you have a Promo Code? <i className={!isOpen ? "fa fa-angle-down" : "fa fa-angle-up"}></i> <i className="fa fa-question-circle"></i></p>
                    </div>
                    <div id="cartRTopB_subTotal">
                        <p id="cartRTopBST_A">Subtotal <i className="fa fa-question-circle"></i></p>
                        <p id="cartRTopBST_B">£{cartTotal}.00</p>
                    </div>
                    <div id="cartRTopB_delivery">
                        <p id="cartRTopBD_A">Estimated Delivery & Handling</p>
                        <p id="cartRTopBD_B">£0.00</p>
                    </div>
                </div>
                <hr/>
                <div id="cartR_topC">
                    <h4 id="cartRTopC_A">Total</h4>
                    <h4 id="cartRTopC_B">£{cartTotal}.00</h4>
                </div>
                <hr/>
                {(!authState)?
                <div id="cartR_topD">
                    <h4 id="cartRTopD_A"><button className="btn btn-sm" disabled="disabled">Checkout</button></h4>
                    <h4 id="cartRTopD_B"><button className="btn btn-sm" disabled="disabled">PayPal</button></h4>
                </div>
                :
                <div id="cartR_topD">
                    <h4 id="cartRTopD_A">Checkout</h4>
                    <h4 id="cartRTopD_B">PayPal</h4>
                </div>
                }
            </div>
        </Fade>
    )
}

export default Cart;