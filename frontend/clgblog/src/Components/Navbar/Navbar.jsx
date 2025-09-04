import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        
        {/* Logo + Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            className="logo me-2"
            src="/media/logo.png"
            alt="Logo"
          />
          STUDENT BLOG
        </Link>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>

          {/* Login Button */}
          <Link to="/login">
            <button type="button" className="btn btn-outline-success">
              <i className='fa fa-sign-in'>Login</i>
            </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
