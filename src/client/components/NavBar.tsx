import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar className='pl-5 bg-gray-400' expand="lg">
      <Navbar.Brand className='text-black font-bold' as={Link} to="/">
        AVG
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className='transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 rounded-md ml-3 text-white bg-gray-500' as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link className='transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 rounded-md ml-3 text-white bg-gray-500' as={Link} to="/polls">
            Polls
          </Nav.Link>
          <Nav.Link className='transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 rounded-md ml-3 text-white bg-gray-500' as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
