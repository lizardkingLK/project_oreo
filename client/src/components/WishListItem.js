import React, { useState } from 'react';
import {
    Fade,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const WishListItem = (props) => {
    const { item } = props;
    const [fadeIn, setFadeIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const handleChangeSize = (i) => {
        console.log(i);
    }

    return (
        <div className="cartLTopDWIC_item">
            <div className="cartLTopDWICI_content">
                <div className="cartLTopDWICIC_image" style={{backgroundImage: "URL("+item.images[0]+")"}}>
                    <div className="cartLTopDWICICI_heartContainer">
                        <h5 className="cartLTopDWICICIHC_heart"><i className="fas fa-heart"></i></h5>
                    </div>
                </div>
                <div className="cartLTopDWICIC_description">
                    <h5 className="cartLTopDWICICD_name">{item.name}</h5>
                    <p className="cartLTopDWICICD_price">{item.price}</p>
                    <div className="cartLTopDWICICD_addToCartContainer">
                        <small onClick={() => setFadeIn(true)} className="cartLTopDWICICDATCC_button">ADD <i className="fas fa-shopping-cart"></i></small>
                        {/* size select */}
                        <Fade in={fadeIn} className="cartLTopDWICICDATCC_fade">
                            <p className="badge badge-dark cartLTopDWICICDATCCF_A" style={{margin: "0 1vh 0 0", fontFamily: "Montserrat, sans-serif"}}>set</p>
                            <Dropdown className="bg-outline-dark cartLTopDWICICDATCCF_B" group isOpen={dropdownOpen} size="sm" toggle={toggleDropdown} style={{borderRadius: "1vh 1vh 1vh 1vh"}}>
                            <DropdownToggle className="cartLTopDWICICDATCCF_C" caret>size</DropdownToggle>
                                <DropdownMenu className="cartLTopDWICICDATCCF_D">
                                    {item.sizes.map( (s,index) => {
                                        return (
                                            <DropdownItem className="cartLTopDWICICDATCCFD_A" onClick={() => handleChangeSize(index)} key={index}>{s}</DropdownItem>
                                        )
                                    })}
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