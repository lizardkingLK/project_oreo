import React from 'react';

const WindowItem = (props) => {
    const { item } = props;
    let img = item.images[0];

    const handleImages = (e,i) => {
        let parent = e.target.parentElement.parentElement.previousElementSibling;
        parent.style.backgroundImage = `URL(${i})`;
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
                    </div>
                    <div className="itemWindowRTopBITopBA_ratingContainer">
                        {/* GETS RATINGS */}
                        <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small>
                        <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small>
                        <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small>
                        <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small>
                        <small className="itemWindowRTopBITopBA_rating"><i className="fa fa-star"></i></small>
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
                    <div className="itemWindowRTopBITopCA_cart">ADD TO CART</div>
                    <div className="itemWindowRTopBITopCA_message">{/* MESSAGE ASKS ENTER SIZE */}</div>
                </div>
                <div className="itemWindowRTopBITopC_B">
                    <p className="itemWindowRTopBITopCB_wishlist">Favourite <i className="itemWindowRTopBITopCB_wishlistA far fa-heart"></i></p>
                    <p className="itemWindowRTopBITopCB_message">{/* MESSAGE SHOWS RESULT */}</p>
                </div>
            </div>
        </div>
    )
}

export default WindowItem;