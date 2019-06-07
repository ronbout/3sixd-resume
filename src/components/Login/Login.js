import React from "react";
import SocialLogin from "./SocialLogin";
import EmailLogin from "./EmailLogin";
import { NavLink } from "react-router-dom";

import "./css/login.css";

const Login = props => {
  return (
    <React.Fragment>
      {props.errMsg && <div className="login-error error">{props.errMsg}</div>}
      <div className="login-container">
        <SocialLogin handleLogin={props.handleLogin} />
        <div className="vert-divider" />
        <div className="horiz-divider" />
        <EmailLogin handleLogin={props.handleLogin} />
      </div>
      <div className="signin-msg">
        <span>New to 3sixD?</span>
        <NavLink to="/register" className="nav-link">
          Register
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default Login;
