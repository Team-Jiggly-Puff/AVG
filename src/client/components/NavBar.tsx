import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar className="bg-purple-100" expand="lg">
      <Navbar.Brand className="font-bold text-black" as={Link} to="/">
        AVG
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="ml-3 rounded-md bg-blue-500 text-black transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700"
            as={Link}
            to="/home"
          >
            Home
          </Nav.Link>
          <Nav.Link
            className="ml-3 rounded-md bg-blue-500 text-black transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700"
            as={Link}
            to="/polls"
          >
            Polls
          </Nav.Link>
          <Nav.Link
            className="ml-3 rounded-md bg-blue-500 text-black transition-all duration-300 hover:-translate-y-1 hover:bg-purple-700"
            as={Link}
            to="/profile"
          >
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
