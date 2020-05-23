import React, { useState } from 'react';
import {
    Fade,
    Dropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

const WishListItem = (props) => {
    const [fadeIn, setFadeIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    return (
        <div className="cartLTopDWIC_item">
            <div className="cartLTopDWICI_content">
                <div className="cartLTopDWICIC_image">
                    <div className="cartLTopDWICICI_heartContainer">
                        <h5 className="cartLTopDWICICIHC_heart"><i className="fas fa-heart"></i></h5>
                    </div>
                </div>
                <div className="cartLTopDWICIC_description">
                    <h5 className="cartLTopDWICICD_name">Nike Sportswear Swoosh</h5>
                    <p className="cartLTopDWICICD_price">£54.95</p>
                    <div className="cartLTopDWICICD_addToCartContainer">
                        <small onClick={() => setFadeIn(true)} className="cartLTopDWICICDATCC_button">ADD <i className="fas fa-shopping-cart"></i></small>
                        {/* size select */}
                        <Fade in={fadeIn} className="">
                            <p className="badge badge-dark" style={{margin: "0 1vh 0 0", fontFamily: "Montserrat, sans-serif"}}>set</p>
                            <Dropdown className="bg-outline-dark" group isOpen={dropdownOpen} size="sm" toggle={toggleDropdown} style={{borderRadius: "1vh 1vh 1vh 1vh"}}>
                            <DropdownToggle className="" caret>size</DropdownToggle>
                                <DropdownMenu className="">
                                    adfsdaf
                                </DropdownMenu>
                            </Dropdown>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListItem;