import React from 'react';

function BottomBar() {
    return (
        <div id="bottomBar">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><span className="p_Link" >GIFT CARDS</span></p>
                        <p className="card-title txt_primary"><span className="p_Link" >FIND A STORE</span></p>
                        <p className="card-title txt_primary"><span className="p_Link" >SIGN UP FOR EMAIL</span></p>
                        <p className="card-title txt_primary"><span className="p_Link" >BECOME A MEMBER</span></p>
                        <p className="card-title txt_primary"><span className="p_Link" >STUDENT DISCOUNT</span></p>
                        <p className="card-title txt_primary"><span className="p_Link" >SITE FEEDBACK</span></p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><small className="p_Link" >GET HELP</small></p>
                        <p className="card-title txt_secondary col_primary_light"><small className="s_Link" >Shipping and Delivery</small></p>
                        <p className="card-title txt_secondary col_primary_light"><small className="s_Link" >Returns</small></p>
                        <p className="card-title txt_secondary col_primary_light"><small className="s_Link" >Payment Options</small></p>
                        <p className="card-title txt_secondary col_primary_light"><small className="s_Link" >Contact Us</small></p>
                        <p className="card-title txt_secondary col_primary_light"><small className="s_Link" >Disclosure</small></p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><small className="p_Link" >ABOUT <small className="txt_ternary">Oreo</small></small></p>
                        <p className="card-title txt_secondary"><small className="s_Link" >News</small></p>
                        <p className="card-title txt_secondary"><small className="s_Link" >Careers</small></p>
                        <p className="card-title txt_secondary"><small className="s_Link" >Investors</small></p>
                        <p className="card-title txt_secondary"><small className="s_Link" >Sustainability</small></p>
                    </div>
                    <div className="col-sm-3 d-flex d-flex justify-content-end mb-3">
                        <p className="p-2 bd-highlight"><small className="p_Link" ><i className="fab fa-twitter"></i></small></p>
                        <p className="p-2 bd-highlight"><small className="p_Link" ><i className="fab fa-facebook"></i></small></p>
                        <p className="p-2 bd-highlight"><small className="p_Link" ><i className="fab fa-youtube"></i></small></p>
                        <p className="p-2 bd-highlight"><small className="p_Link" ><i className="fab fa-instagram"></i></small></p>
                    </div>
                </div>
                <hr className="my-4 bg_grey" />
                <div className="row" id="bottom_pane">
                    <div className="col-sm-4 d-flex flex-row bd-highlight">
                        <small className="p-2 bd-highlight"><small className="t_Link" ><i className="fas fa-map-marker-alt"></i> Sri Lanka </small></small>
                        <small className="p-2 bd-highlight">&copy; 2020 Oreo, Inc. All Rights Reserved</small>
                    </div>
                    <div className="col-sm-8 d-flex flex-row-reverse bd-highlight">
                        <small className="p-2 bd-highlight"><small className="t_Link" >Cookie Settings</small></small>
                        <small className="p-2 bd-highlight"><small className="t_Link" >Privacy & Cookie Policy</small></small>
                        <small className="p-2 bd-highlight"><small className="t_Link" >Company Details</small></small>
                        <small className="p-2 bd-highlight"><small className="t_Link" >Terms of Sale</small></small>
                        <small className="p-2 bd-highlight"><small className="t_Link" >Terms of Use</small></small>
                        <small className="p-2 bd-highlight"><small className="t_Link" >Guides</small></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomBar;