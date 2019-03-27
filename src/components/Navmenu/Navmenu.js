import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import "./navmenu.css";

const Navmenu = () => {
    return (
        <nav className="navbar">
            <ul>
            <li className="nav-item">
            <NavLink to="/candidate/setup" className="nav-link">
                Candidate
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/skill/setup" className="nav-link">
                Skills
            </NavLink>
            </li>
            </ul>
        </nav>
    )
}

export default Navmenu;