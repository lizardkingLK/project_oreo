import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

import AuthWindow from './AuthWindow';

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
              <AuthWindow buttonLabel={"SignIn"} className={"modal-dialog modal-lg"} />
            </NavItem>
          </Nav>
            <NavbarText><p style={{fontFamily: "Roboto, sans-serif"}}></p>Oreo_Group&trade;</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;