import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

class Navigation extends Component{
    render() {
        return(
            <div>
                <Navbar style={{backgroundColor: "#009399"}} expand="lg" >
                    <Navbar.Brand className="txt_ternary" >Store Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" navbar>
                            <NavLink className="d-inline p-2 text-white" to="/">Inventory</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;