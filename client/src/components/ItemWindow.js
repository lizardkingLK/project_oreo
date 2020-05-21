import React, { useState } from 'react';
import {
    Fade
} from 'reactstrap';

import WindowItem from './WindowItem';
import CategoryMenuA from './CategoryMenuA';
import CategoryMenuB from './CategoryMenuB';

const ItemWindow = (props) => {
    const { 
        setCartState, 
        windowItems, 
        searchItems, 
        authState, 
        setAuthState,
        getCartId,
        addToCart,
        cartItems,
        itemSize,
        setItemSize,
        categories,
        getCategoryItems
    } = props;
    let keyword = '';
    let bg = '';
    (windowItems.length === 0) ? bg = "transparent" : bg = "var(--primaryLight)";
    const [fadeIn, setFadeIn] = useState(false);
    
    let typeA = categories.filter(category => {
        return category.categoryType === 'Primary';
    })

    let typeB = categories.filter(category => {
        return category.categoryType === 'Secondary';
    })

    let typeC = categories.filter(category => {
        return category.categoryType === 'Ternary';
    })

    const getKeyword = (e) => {
        keyword = e.target.value;
    }

    const searchKeyword = (e) => {
        e.preventDefault();
        if(fadeIn) setFadeIn(false);
        if(keyword)
            searchItems(keyword);

        setFadeIn(true);
    }

    return (
    <div id="itemWindow">
        <div id="itemWindow_left">
            <div id="itemWindowL_topA">
                <h5 id="itemWindowLTopA_A">Categories</h5>
            </div>
            <div id="itemWindowL_topB">
                {/* PRIMARY CATEGORIES */}
                <CategoryMenuA
                    collapseState={true}
                    categoryType={"Primary"}
                    btnStyle={"itemWindowLTopBC_btn"}
                    collapseStyle={"itemWindowLTopBC_collapse"}
                    cardStyle={"itemWindowLTopBCCo_card"}
                    cardBodyStyle={"itemWindowLTopBCCoCa_body"}
                    categoryStyle={"itemWindowLTopBCCoCaB_category"}
                    categories={typeA}
                />
                {/* SECONDARY CATEGORIES */}
                <CategoryMenuB
                    collapseState={false}
                    categoryType={"Secondary"}
                    btnStyle={"itemWindowLTopBC_btn"}
                    collapseStyle={"itemWindowLTopBC_collapse"}
                    cardStyle={"itemWindowLTopBCCo_card"}
                    cardBodyStyle={"itemWindowLTopBCCoCa_body"}
                    categoryStyle={"itemWindowLTopBCCoCaB_alphabetical"}
                    categories={typeB}
                    getCategoryItems={getCategoryItems}
                />
                {/* TERNARY CATEGORIES */}
                <CategoryMenuB
                    collapseState={false}
                    categoryType={"Ternary"}
                    btnStyle={"itemWindowLTopBC_btn"}
                    collapseStyle={"itemWindowLTopBC_collapse"}
                    cardStyle={"itemWindowLTopBCCo_card"}
                    cardBodyStyle={"itemWindowLTopBCCoCa_body"}
                    categoryStyle={"itemWindowLTopBCCoCaB_alphabetical"}
                    categories={typeC}
                    getCategoryItems={getCategoryItems}
                />
            </div>
        </div>
        <div id="itemWindow_right" style={{background: bg}}>
            <div id="itemWindowR_topA">
                <div id="itemWindowRTopA_meta">
                    {/* CART LINK */}
                    <p id="itemWindowRTopAM_cartBtn" className="cartBtn" onClick={() => setCartState(true)}>
                        <a id="itemWindowRTopAMCB_A" href="#navbar"><i className="fas fa-shopping-cart"></i></a>
                    </p>
                    {/* CART COUNT */}
                    <p id="itemWindowRTopAM_cartCount" style={{margin: "0 0 0 1vh", fontFamily: "Montserrat, sans-serif"}}>{cartItems.length}</p>
                </div>
                <Fade in={fadeIn} id="itemWindowRTopA_resultCount" style={{margin: "0 1vh 0 0", cursor: "pointer"}}>
                    <span id="itemWindowRTopARC_A" className="badge badge-dark">{windowItems.length} found</span>
                </Fade>
                {/* SEARCH ITEMS */}
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