import React from 'react';

import Item from './Item';

const Showcase = (props) => {
    let showcase = props.showcase;
    let title = props.title;
    let showcaseItems = props.showcaseItems;
    let blur = props.blur;
    let authState = props.authState;
    let setAuthState = props.setAuthState;
    let getCartId = props.getCartId;
    let addToCart = props.addToCart;
    let getWishListId = props.getWishListId;
    let addToWishList = props.addToWishList;

    (showcase === true) ? showcase = 'block' : showcase = 'none';

    return (
        <div id="showcase" style={{ display: showcase, filter: "blur(" + blur + ")" }}>
            <div id="showcase_card">
                <div className="row">
                    <div className="col-sm-12 d-flex flex-row mt-1">
                        <h1 className="display-3 txt_secondary text-left" id="showcase_title">{title}</h1>
                    </div>
                </div>

                <div>
                    {(showcaseItems.length !== 0)
                        ?
                        showcaseItems.map(cont => {
                            return (
                                <Item
                                    key={cont._id}
                                    cont={cont}
                                    authState={authState}
                                    setAuthState={setAuthState}
                                    getCartId={getCartId}
                                    addToCart={addToCart}
                                    getWishListId={getWishListId}
                                    addToWishList={addToWishList}
                                />
                            )
                        })
                        :
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '85vh'
                        }}>
                            <div style={{ flex: '2' }}></div>
                            <div style={{ flex: '1' }}>
                                <h1 style={{
                                    fontSize: '12vh',
                                    textAlign: 'center',
                                    color: 'var(--primaryLight)',
                                    backgroundColor: 'var(--primaryAccent)',
                                    fontFamily: 'Roboto, sans-serif'
                                }}>
                                    Best Prices
                                    <a href="#itemWindow" style={{ textDecoration: 'none' }}>
                                        <p style={{
                                            backgroundColor: 'var(--primaryDark)',
                                            color: 'var(--secondaryAccent)'
                                        }}>
                                            Check Now
                                        </p>
                                    </a>
                                </h1>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default Showcase;