import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <Navbar fixed="bottom" expand="lg" bg="dark" variant="dark">
            <Nav className="ml-auto mr-auto copyright">
                @Copyright {year} | J.C.
            </Nav>
        </Navbar>
    );
};

export default Footer;
