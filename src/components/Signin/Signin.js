import React, { Component } from 'react';

import "./signin.css";

function Signin() {
    return (
        <nav className="signin">
            <ul>
            <li><a href="/jobs">SIGN IN</a></li>
            <li><a href="/contact">REGISTER</a></li>
            </ul>
        </nav>
    )
}

export default Signin;