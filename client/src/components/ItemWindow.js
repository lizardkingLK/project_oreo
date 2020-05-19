import React from 'react';

import WindowItem from './WindowItem';

const ItemWindow = (props) => {
    const { 
        setCartState, 
        windowItems, 
        searchItems, 
        authState, 
        setAuthState,
        getCartId,
        addToCart,
        itemSize,
        setItemSize
    } = props;
    let keyword = '';
    let bg = '';

    if(windowItems.length === 0)
        bg = "transparent";
    else
        bg = "var(--primaryLight)";

    const getKeyword = (e) => {
        keyword = e.target.value;
    }

    const searchKeyword = (e) => {
        e.preventDefault();
        if(keyword)
            searchItems(keyword);
    }

    return (
    <div id="itemWindow">
        <div id="itemWindow_left">
            <div id="itemWindowL_topA">
                <h5 id="itemWindowLTopA_A">Categories</h5>
            </div>
            <div id="itemWindowL_topB">
                <div className="itemWindowLTopB_category">
                    {/* PRIMARY CATEGORIES */}
                    {/* SECONDARY CATEGORIES */}
                    {/* TERNARY CATEGORIES */}
                </div>
            </div>
        </div>
        <div id="itemWindow_right" style={{background: bg}}>
            <div id="itemWindowR_topA">
                <div id="itemWindowRTopA_meta">
                    <p id="itemWindowRTopAM_cartBtn" className="cartBtn" onClick={() => setCartState(true)}>
                        <a id="itemWindowRTopAMCB_A" href="#navbar">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </p>
                    {/* SEARCH META */}
                    <p id="itemWindowRTopAM_message">{/* META */}</p>
                </div>
                <form id="itemWindowRTopA_form" onSubmit={searchKeyword}>
                    <input onChange={getKeyword} type="text" id="itemWindowRTopAF_input" className="form-control form-control-sm"  placeholder="Search.." />
                    <button type="submit" id="itemWindowRTopAF_submit" className="btn btn-sm btn-outline-secondary" value="OK"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div id="itemWindowR_topB">
                {windowItems.map( (item) => {
                    return (
                        <WindowItem 
                            key={item._id} 
                            item={item} 
                            authState={authState} 
                            setAuthState={setAuthState} 
                            getCartId={getCartId} 
                            addToCart={addToCart}
                            itemSize={itemSize}
                            setItemSize={setItemSize}
                        />
                    )
                })}
            </div>
            <div id="itemWindowR_topC">
                {/* PAGINATION */}
            </div>
        </div>
    </div>
    )
}

export default ItemWindow;