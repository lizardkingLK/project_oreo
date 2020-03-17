import React from 'react';
import {
    Table,
    Button
} from 'reactstrap';

const Showcase = (props) => {
    let title = props.title;
    let contents = props.contents;
    let blur = props.blur;

    return (
        <div id="showcase" style={{filter: "blur("+blur+")"}}>
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
                    {
                        contents.map(cont => {
                            console.log(cont)
                            return (
                                <div className="item_card" key={cont._id}>
                                    <div className="itemC_left">

                                    </div>
                                    <div className="itemC_right">
                                        <div className="itemCR_subtitle">
                                            {cont.subcategories.map(sub => {
                                                return (
                                                    <small key={sub}>&nbsp;{sub.toString().toUpperCase()}&nbsp;</small>
                                                )
                                            })}
                                        </div>
                                        <div className="itemCR_topA">
                                            <div className="itemCR_topA_title">{cont.name}</div>
                                            <div className="itemCR_topA_price">{cont.price}</div>
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
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="itemCR_topC">
                                            <Button color="dark" className="btn btn-sm itemCR_topC_addToCart">Add To Cart</Button>
                                            <Button color="light" className="btn btn-sm itemCR_topC_favourite">Favourite <i className="far fa-heart"></i></Button>
                                        </div>
                                        <div className="itemCR_topD">
                                            <small className="itemCR_topD_description">{cont.description}</small>
                                        </div>
                                        <div className="itemCR_topE">
                                            <a href={cont.storyUrl} className="itemCR_topE_readMore">Read More</a>
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
                        })
                    }
                </div>   
            </div>
        </div>
    )
    
}

export default Showcase;