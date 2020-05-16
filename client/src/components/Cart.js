import React, { useState } from 'react';
import {
    Collapse,
    Fade
} from 'reactstrap';

import SignInWindow from './SignInWindow';
import SignUpWindow from './SignUpWindow';

const Cart = (props) => {
    let cart = props.cart;
    let fadeIn = '';

    if(cart === true) { 
        cart = 'flex';
        fadeIn = true;
    }
    else {
        cart = 'none';
        fadeIn = false;
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <Fade in={fadeIn} id="cart" style={{display: cart}}>
            <div id="cart_left">
                <div id="cartL_topA">
                    <h4 id="cartLTopA_heading">Cart</h4>
                </div>
                <div id="cartL_topB">
                    <small id="cartLTopB_emptyMsg">There are no items in your cart.</small>
                    {/* ALL CART ITEMS */}
                    <div className="cartLTopB_cartItem">
                        adf
                    </div>
                </div>
                <div id="cartL_topC">
                    <h5 id="cartLTopC_heading">Wishlist</h5>
                </div>
                <div id="cartL_topD">
                    {(!props.authState)?
                        <small id="cartLTopD_emptyMsg">
                            Want to view your favourites? 
                            <SignUpWindow setAuthState={props.setAuthState} buttonLabel={"Join us"} className={"modal-dialog modal-lg"} /> 
                            or 
                            <SignInWindow setAuthState={props.setAuthState} buttonLabel={"SignIn"} className={"modal-dialog modal-lg"} />
                        </small>
                        :
                        <small id="cartLTopD_titleMsg">
                            Wishlist for {props.authState.name}
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
                        <p id="cartRTopBP_B" onClick={toggleCollapse}>Do you have a Promo Code? <i className={!isOpen ? "fa fa-angle-down" : "fa fa-angle-up"}></i> <i className="fa fa-question-circle"></i></p>
                    </div>
                    <div id="cartRTopB_subTotal">
                        <p id="cartRTopBST_A">Subtotal <i className="fa fa-question-circle"></i></p>
                        <p id="cartRTopBST_B">£0.00</p>
                    </div>
                    <div id="cartRTopB_delivery">
                        <p id="cartRTopBD_A">Estimated Delivery & Handling</p>
                        <p id="cartRTopBD_B">£0.00</p>
                    </div>
                </div>
                <hr/>
                <div id="cartR_topC">
                    <h4 id="cartRTopC_A">Total</h4>
                    <h4 id="cartRTopC_B">£0.00</h4>
                </div>
                <hr/>
            </div>
        </Fade>
    )
}

export default Cart;