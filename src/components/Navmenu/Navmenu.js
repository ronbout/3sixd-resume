import React from "react";
import { NavLink } from "react-router-dom";

import "./navmenu.css";

const Navmenu = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/candidate/setup" className="nav-link">
            Candidate
          </NavLink>
        </li>
        <li>
          <NavLink to="/skill/setup" className="nav-link">
            Skills
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navmenu;
