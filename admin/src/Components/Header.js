import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import {FaBars} from 'react-icons/fa';

class Header extends Component {

    render() {
        return (
            <Navbar style={{backgroundColor:"#009399"}} expand="lg">
                <Navbar.Brand id="navbrand" style={{fontFamily: "Roboto"}}><FaBars/> Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" navbar>
                        <NavLink className="d-inline p-2 text-white" to="/">Categories</NavLink>
                        <NavLink className="d-inline p-2 text-white" to="/storeManagersManagement">Store Managers</NavLink>
                    </Nav>
                    <Navbar.Text><p style={{fontFamily: "Roboto, sans-serif"}}></p>Oreo_Group&trade;</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;