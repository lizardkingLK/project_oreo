import React from 'react';
import {
    Table,
    Button
} from 'reactstrap';

const Showcase = (props) => {
    const title = props.title;
    const contents = props.contents;
    let items_body = [];

    items_body = contents.map(cont => {
        if(cont.category === 'Men') {
            return (
                <div className="item_card" key={cont.id}>
                    <div className="itemC_left">
                        
                    </div>
                    <div className="itemC_right">
                        <div className="itemCR_topA">
                            <div className="itemCR_topA_title">{cont.name}</div>
                        </div>
                        <div className="itemCR_topB">
                            <div className="itemCR_topB_sizeSelect">Select Size</div>
                            <Table size="sm" className="itemCR_topB_sizesTable" borderless>
                                <tbody>
                                    <tr>
                                        <td>UK 5.5</td>
                                        <td>UK 6 (EU 39)</td>
                                        <td>UK 6 (EU 40)</td>
                                    </tr>
                                    <tr>
                                        <td>UK 6.5</td>
                                        <td>UK 7</td>
                                        <td>UK 7.5</td>
                                    </tr>
                                    <tr>
                                        <td>UK 8</td>
                                        <td>UK 8.5</td>
                                        <td>UK 9</td>
                                    </tr>
                                    <tr>
                                        <td>UK 9.5</td>
                                        <td>UK 10</td>
                                        <td>UK 10.5</td>
                                    </tr>
                                    <tr>
                                        <td>UK 11</td>
                                        <td>UK 11.5</td>
                                        <td>UK 12</td>
                                    </tr>
                                    <tr>
                                        <td>UK 13</td>
                                        <td>UK 14</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="itemCR_topC">
                            <Button color="dark" className="btn btn-sm itemCR_topC_addToCart">Add To Cart</Button>
                            <Button color="light" className="btn btn-sm itemCR_topC_favourite">Favourite <i className="far fa-heart"></i></Button>
                        </div>
                        <div className="itemCR_topD">
                            <small className="itemCR_topD_description">Nike Sportswear's first collaboration by the Hatfield brothers, the Nike Air Max 90 FlyEase combines the timelessness of Tinker's original design with Tobie's FlyEase technology. The heel collapses when you step in then snaps back into place, providing quick, easy access to one of history's most iconic sneakers.</small>
                        </div>
                        <div className="itemCR_topE">
                            <a href="#bottomBar" className="itemCR_topE_readMore">Read More</a>    
                        </div>
                        <div className="itemCR_topF">
                            <div className="itemCR_topF_delivery">Free Delivery & Returns</div>
                        </div>
                        <div className="itemCR_topG">
                            <div className="itemCR_topG_freeDelivery">Reviews (0)</div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(cont.category === 'Women') {
            return (
                <div className="lead content d-flex d-flex justify-content-center mb-3" key={cont.id}>
                    <div>Name : {cont.name}</div>
                </div>
            )
        }
        else if(cont.category === 'Kids') {
            return (
                <div className="lead content d-flex d-flex justify-content-center mb-3" key={cont.id}>
                    <div>Name : {cont.name}</div>
                </div>
            )
        }
        else 
            return (
                null
            )
    })

    return (
        <div id="showcase">
            <div id="showcase_card">
                <div className="row">
                    <div className="col-sm-6 d-flex flex-row mt-1">
                        <h1 className="display-3 txt_secondary text-left" id="showcase_title">{title}</h1>
                    </div>
                    <div className="col-sm-6 d-flex flex-row-reverse mt-4">
                        <small className="txt_secondary text-right">Oreo is a online shopping store made just for you.</small>
                    </div>
                </div>

                <div>
                    {items_body}
                </div>
                
            </div>
        </div>
    )
    
}

export default Showcase;