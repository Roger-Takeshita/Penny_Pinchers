import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import styles from './NavBar.module.css';

const NavBar = (props) => {
    let form = props.user ?
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form> : '';
    let nav = props.user ? 
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBar2}>
            <Nav className="mr-auto">
                <Nav.Link><Link className={`${styles.NavBarLink} nav-link`} to="/lists">My Lists</Link></Nav.Link>
                <Nav.Link><Link className={`${styles.NavBarLink} nav-link`} to="/newlist">New List</Link></Nav.Link>
                <NavDropdown className={`${styles.NavBarLink} nav-link`} title={props.user.firstName.charAt(0).toUpperCase() + props.user.firstName.slice(1) + " " + props.user.lastName.charAt(0).toUpperCase() + props.user.lastName.slice(1)} id="basic-nav-dropdown">
                    <NavDropdown.Item><Link className="nav-link" to="/profile">Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/stores">Stores</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/products">Products</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/categories">Categories</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/subcategories">Sub-Categories</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="nav-link" to="/about">About</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className={`${styles.NavBarLink}`} onClick={props.handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            {/* <Nav className="mr-auto">
            <div className='nav-link'><Nav.Link className={styles.NavBarLink} href="/lists">Lists</Nav.Link></div>
            <div className='nav-link'><Nav.Link className={styles.NavBarLink} href="/newlist">New List</Nav.Link></div>
            <NavDropdown className={`${styles.NavBarLink} nav-link`} title={props.user.firstName.charAt(0).toUpperCase() + props.user.firstName.slice(1) + " " + props.user.lastName.charAt(0).toUpperCase() + props.user.lastName.slice(1)} id="basic-nav-dropdown">
                <div><NavDropdown.Item className="nav-link" href="/profile">Profile</NavDropdown.Item></div>
                <div><NavDropdown.Item className="nav-link" href="/stores">Stores</NavDropdown.Item></div>
                <div><NavDropdown.Item className="nav-link" href="/products">Products</NavDropdown.Item></div>
                <div><NavDropdown.Item className="nav-link" href="/categories">Categories</NavDropdown.Item></div>
                <div><NavDropdown.Item className="nav-link" href="/subcategories">Sub-Categories</NavDropdown.Item></div>
                <div><NavDropdown.Item className="nav-link" href="/about">About</NavDropdown.Item></div>
                <NavDropdown.Divider />
                <div><NavDropdown.Item className={`${styles.NavBarLink}`} onClick={props.handleLogout}>Log Out</NavDropdown.Item></div>
            </NavDropdown>
            </Nav> */}
        </Navbar.Collapse>
        :
        <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBar2}>
            <Nav className="mr-auto">
                <Link className={`${styles.NavBarLink} nav-link`} to="/login">Log In</Link>
                <Link className={`${styles.NavBarLink} nav-link`} to="/signup">Sign Up</Link>
                <Link className={`${styles.NavBarLink} nav-link`} to="/about">About</Link>
            </Nav>
        </Navbar.Collapse>;
    
    return (
        <Navbar bg="light" expand="lg" className={styles.NavBar1}>
            <Navbar.Brand><Link to="/">Penny Pincher<img src="/logo.png" alt="logo" width="25px"/></Link></Navbar.Brand>
            {form}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {nav}
        </Navbar>
    );
};

export default NavBar;