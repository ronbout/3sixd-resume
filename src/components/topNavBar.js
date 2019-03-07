import React from "react";
import { NavLink } from "react-router-dom";

const TopNavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <h3 className="brand">3sixD</h3>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#topmenu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="topmenu">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className="nav-link">
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/skill/search" className="nav-link">
                Skill Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/skill/setup" className="nav-link">
                Skills
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
