import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import styles from '../NavBar/NavBar.module.css';

const NavBar = (props) => {
    let form = props.user ?
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form> : '';
    let nav = props.user ? 
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBar2}>
            <Nav className="mr-auto">
                <Nav.Link href="#link"><Link className={`${styles.NavBarLink} nav-link`} to="/lists">Lists</Link></Nav.Link>
                <Nav.Link href="#link"><Link className={`${styles.NavBarLink} nav-link`} to="/new">New List</Link></Nav.Link>
                <NavDropdown className={`${styles.NavBarLink} nav-link`} title={props.user.firstName.charAt(0).toUpperCase() + props.user.firstName.slice(1) + " " + props.user.lastName.charAt(0).toUpperCase() + props.user.lastName.slice(1)} id="basic-nav-dropdown">
                    <NavDropdown.Item><Link className="nav-link" to="/">Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/">Stores</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/">Products</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/">Category One</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/">Category Two</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/">Category Three</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className={`${styles.NavBarLink}`} onClick={props.handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        :
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBar2}>
            <Nav className="mr-auto">
                <Link className={`${styles.NavBarLink} nav-link`} to="/login">Log In</Link>
                <Link className={`${styles.NavBarLink} nav-link`} to="/signup">Sign Up</Link>
            </Nav>
        </Navbar.Collapse>;
    
    return (
        <Navbar bg="light" expand="lg" className={styles.NavBar1}>
            <Navbar.Brand><Link to="/">Penny Pinchers</Link></Navbar.Brand>
            {form}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {nav}
        </Navbar>
    );
};

export default NavBar;