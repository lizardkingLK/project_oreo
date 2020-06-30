import React, { useState } from 'react';
import {
    Fade
} from 'reactstrap';

import WindowItem from './WindowItem';
import CategoryMenuA from './CategoryMenuA';
import CategoryMenuB from './CategoryMenuB';
import Pagination from './pagination/Pagination';

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
        categories,
        getCategoryItems,
        getWishListId,
        addToWishList
    } = props;

    let bg;
    (windowItems.length === 0) ? bg = "transparent" : bg = "var(--primaryLight)";

    const [toggleLeft, setToggleLeft] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = windowItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let typeA = categories.filter(category => category.categoryType === 'Primary');
    let typeB = categories.filter(category => category.categoryType === 'Secondary');
    let typeC = categories.filter(category => category.categoryType === 'Ternary');

    let keyword;
    const getKeyword = (e) => keyword = e.target.value;

    const searchKeyword = (e) => {
        e.preventDefault();
        if (fadeIn) setFadeIn(false);
        if (keyword)
            searchItems(keyword);

        setFadeIn(true);
    }

    return (
        <div id="itemWindow">
            <div
                id="itemWindow_left"
                style={{
                    width: (toggleLeft) ? "0" : "20vw"
                }}
            >
                <div id="itemWindowL_topA">
                    <h5 id="itemWindowLTopA_A">Browse</h5>
                </div>
                <div id="itemWindowL_topB">
                    {/* PRIMARY CATEGORIES */}
                    <CategoryMenuA
                        collapseState={true}
                        categoryType={"Select"}
                        btnStyle={"itemWindowLTopBC_btn"}
                        collapseStyle={"itemWindowLTopBC_collapse"}
                        cardStyle={"itemWindowLTopBCCo_card"}
                        cardBodyStyle={"itemWindowLTopBCCoCa_body"}
                        categoryStyle={"itemWindowLTopBCCoCaB_category"}
                        categories={typeA}
                        getCategoryItems={getCategoryItems}
                    />
                    {/* SECONDARY CATEGORIES */}
                    <CategoryMenuB
                        collapseState={false}
                        categoryType={"Category"}
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
                        categoryType={"Type"}
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
            <div
                id="itemWindow_right"
                style={{
                    background: bg,
                    width: (toggleLeft) ? "100vw" : "80vw"
                }}
            >
                <div id="itemWindowR_topA">
                    <div id="itemWindowRTopA_meta">
                        {/* TOGGLE LEFT PANE */}
                        <div
                            id="itemWindowRTopAM_toggleLeftPane"
                            style={{
                                margin: "0 2vh",
                                fontFamily: "Montserrat, sans-serif",
                                cursor: "pointer"
                            }}
                            onClick={() => setToggleLeft(!toggleLeft)}
                        >
                            <i className="fa fa-bars"></i>
                        </div>
                        {/* CART LINK */}
                        <div
                            id="itemWindowRTopAM_cartBtn"
                            className="cartBtn"
                            onClick={() => setCartState(true)}
                        >
                            <a id="itemWindowRTopAMCB_A" href="#navbar"><i className="fas fa-shopping-cart"></i></a>
                        </div>
                        {/* CART COUNT */}
                        <div
                            id="itemWindowRTopAM_cartCount"
                            style={{
                                margin: "0 0 0 1vh",
                                fontFamily: "Montserrat, sans-serif"
                            }}
                        >
                            {cartItems.length}
                        </div>
                    </div>
                    <Fade in={fadeIn} id="itemWindowRTopA_resultCount" style={{ margin: "0 1vh 0 0", cursor: "pointer" }}>
                        <span id="itemWindowRTopARC_A" className="badge badge-dark">{windowItems.length} found</span>
                    </Fade>
                    {/* SEARCH ITEMS */}
                    <form id="itemWindowRTopA_form" onSubmit={searchKeyword}>
                        <input
                            onChange={getKeyword}
                            type="text"
                            id="itemWindowRTopAF_input"
                            placeholder="Search.."
                        />
                        <button
                            type="submit"
                            id="itemWindowRTopAF_submit"
                            className="btn btn-sm btn-outline-secondary"
                            value="OK"
                        >
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                <div id="itemWindowR_topC"
                    style={{
                        margin: "0 2vh",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}
                >
                    {/* PAGINATION */}
                    <Pagination itemsPerPage={itemsPerPage} totalItems={windowItems.length} paginate={paginate} />
                </div>
                <div id="itemWindowR_topB">
                    {currentItems.map((item) => {
                        return (
                            <WindowItem
                                key={item._id}
                                item={item}
                                authState={authState}
                                setAuthState={setAuthState}
                                getCartId={getCartId}
                                addToCart={addToCart}
                                getWishListId={getWishListId}
                                addToWishList={addToWishList}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ItemWindow;