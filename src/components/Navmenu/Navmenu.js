import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import "../../scss/nav.css";

const Navmenu = () => {
    return (
        <nav className="navbar nav">
            <ul>
            <li><NavLink to="/candidate/setup" className="nav-link">Candidate</NavLink></li>
            <li><NavLink to="/skill/setup" className="nav-link">Skills</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navmenu;