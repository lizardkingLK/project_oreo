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
              <NavLink href="#">Men</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Women</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Kids</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Collections</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="fas fa-user"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Sign-Up
                </DropdownItem>
                <DropdownItem>
                  About
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Contact
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
            <NavbarText><NavLink href="https://github.com/lizardkingLK/project_oreo"><i className="fab fa-github col_primary_accent"></i></NavLink></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;