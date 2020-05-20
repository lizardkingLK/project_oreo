import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import SignInWindow from './SignInWindow';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div id="navbar">
      <Navbar color="light" light expand="sm">
        <NavbarBrand className="txt_ternary" href="/">Oreo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={props.handleNavigation}>Men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={props.handleNavigation}>Women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={props.handleNavigation}>Kids</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={props.handleNavigation}>Collections</NavLink>
            </NavItem>
            <NavItem>
              {(!props.authState)?
                <SignInWindow
                  scrollable={false}
                  setAuthState={props.setAuthState} 
                  buttonLabel={"SignIn"} 
                  className={"modal-dialog modal-lg"}
                />
                :
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} >
                  <NavLink onClick={props.clearAuthState}>SignOut</NavLink>
                </div>
              }
            </NavItem>
          </Nav>
            <small className="cartBtn" onClick={() => props.setCartState(!props.cartState)}>
              <i className="fas fa-shopping-cart"></i>
            </small>
            <small className="groupLogo">
              Oreo_Group&trade;
            </small>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;