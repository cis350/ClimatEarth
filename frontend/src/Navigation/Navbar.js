import React from "react";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        ClimatEarth
      </a>
      <button
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

      <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/tasks">
              Daily Goals
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/carbon">
              Carbon Footprint Calculator
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/leaderboard">
              Leaderboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;