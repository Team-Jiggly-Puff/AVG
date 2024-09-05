import React from "react";
import { Navigate,useNavigate, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="bg-light">
      <a className="ml-2 text-10" href="#">
        AVG
      </a>
      <Nav className="mr-auto">
        <Link className="ml-3 nav-link" to="/Home">
          Home
        </Link>
        <Link className="nav-link" to="/poll">
          Polls
        </Link>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </Nav>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="flex collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/Home">
              Home <span className="sr-only"></span>
            </Link>
          </li>
         <li className="nav-item" onClick={()=>{console.log('hi')}}>
            <Link className="nav-link" to="/poll">
              Polls
            </Link>
          </li>
          <li className="nav-item">
            <a className=" nav-link" href="#">
              Pricing
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="nav-item">
        Profile
      </div> */}
    </Navbar>
  );
};

export default NavBar;
