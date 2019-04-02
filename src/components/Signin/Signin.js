import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import "./signin.css";

function Signin() {
    return (
        <nav className="signin">
            <ul>
                <li><NavLink to="/signin" className="nav-link">Sign In</NavLink></li>
                <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
            </ul>
        </nav>
    )
}

export default Signin;