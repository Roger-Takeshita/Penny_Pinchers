import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';

const NavBar = (props) => {
    let nav = props.user ? 
        <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Nav className="mr-auto">
                <Nav.Link href="#link">Closed Lists</Nav.Link>
                <Nav.Link href="#link">New List</Nav.Link>
                <NavDropdown title={props.user.firstName.charAt(0).toUpperCase() + props.user.firstName.slice(1) + " " + props.user.lastName.charAt(0).toUpperCase() + props.user.lastName.slice(1)} id="basic-nav-dropdown">
                    <NavDropdown.Item><Link to="/">Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/">Stores</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/">Products</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/">Category One</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/">Category Two</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link to="/">Category Three</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="" onClick={props.handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        :
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className={`${styles.navLink} nav-link`} to="/login">Log In</Link>
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </Nav>
        </Navbar.Collapse>;
    
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link to="/">Penny Pinchers</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {nav}
        </Navbar>
    );
};

export default NavBar;