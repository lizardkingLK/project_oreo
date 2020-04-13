import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <i className="far fa-user-circle"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <AuthWindow buttonLabel={"SignUp"} className={"modal-dialog modal-lg"} />
                </DropdownItem>
                <DropdownItem>
                  About
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <a href="#bottomBar">Contact</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
            <NavbarText><p style={{fontFamily: "Roboto, sans-serif"}}></p>Oreo_group&trade;</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;