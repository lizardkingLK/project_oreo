import React from 'react';

const Cart = (props) => {
    let cart = props.cart;
    (cart === true) ? cart = 'block' : cart = 'none';

    return (
        <div id="cart" style={{display: cart}}>
            cart
        </div>
    )
}

export default Cart;