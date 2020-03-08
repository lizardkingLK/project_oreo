import React from 'react';

function BottomBar() {
    return (
        <div className="" id="bottomBar">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><a className="p_Link" href="#">GIFT CARDS</a></p>
                        <p className="card-title txt_primary"><a className="p_Link" href="#">FIND A STORE</a></p>
                        <p className="card-title txt_primary"><a className="p_Link" href="#">SIGN UP FOR EMAIL</a></p>
                        <p className="card-title txt_primary"><a className="p_Link" href="#">BECOME A MEMBER</a></p>
                        <p className="card-title txt_primary"><a className="p_Link" href="#">STUDENT DISCOUNT</a></p>
                        <p className="card-title txt_primary"><a className="p_Link" href="#">SITE FEEDBACK</a></p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><a className="p_Link" href="#">GET HELP</a></p>
                        <p className="card-title txt_secondary col_primary_light"><a className="s_Link" href="#">Shipping and Delivery</a></p>
                        <p className="card-title txt_secondary col_primary_light"><a className="s_Link" href="#">Returns</a></p>
                        <p className="card-title txt_secondary col_primary_light"><a className="s_Link" href="#">Payment Options</a></p>
                        <p className="card-title txt_secondary col_primary_light"><a className="s_Link" href="#">Contact Us</a></p>
                        <p className="card-title txt_secondary col_primary_light"><a className="s_Link" href="#">Disclosure</a></p>
                    </div>
                    <div className="col-sm-3">
                        <p className="card-title txt_primary"><a className="p_Link" href="#">ABOUT <small className="txt_ternary">Oreo</small></a></p>
                        <p className="card-title txt_secondary"><a className="s_Link" href="#">News</a></p>
                        <p className="card-title txt_secondary"><a className="s_Link" href="#">Careers</a></p>
                        <p className="card-title txt_secondary"><a className="s_Link" href="#">Investors</a></p>
                        <p className="card-title txt_secondary"><a className="s_Link" href="#">Sustainability</a></p>
                    </div>
                    <div className="col-sm-3 d-flex d-flex justify-content-end mb-3">
                        <p className="p-2 bd-highlight"><a className="p_Link" href="#"><i className="fab fa-twitter"></i></a></p>
                        <p className="p-2 bd-highlight"><a className="p_Link" href="#"><i className="fab fa-facebook"></i></a></p>
                        <p className="p-2 bd-highlight"><a className="p_Link" href="#"><i className="fab fa-youtube"></i></a></p>
                        <p className="p-2 bd-highlight"><a className="p_Link" href="#"><i className="fab fa-instagram"></i></a></p>
                    </div>
                </div>
                <hr className="my-4 bg_grey" />
                <div className="row" id="bottom_pane">
                    <div className="col-sm-4 d-flex flex-row bd-highlight">
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#"><i className="fas fa-map-marker-alt"></i> Sri Lanka </a></small>
                        <small className="p-2 bd-highlight">&copy; 2020 Oreo, Inc. All Rights Reserved</small>
                    </div>
                    <div className="col-sm-8 d-flex flex-row-reverse bd-highlight">
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Cookie Settings</a></small>
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Privacy & Cookie Policy</a></small>
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Company Details</a></small>
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Terms of Sale</a></small>
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Terms of Use</a></small>
                        <small className="p-2 bd-highlight"><a className="t_Link" href="#">Guides</a></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomBar;