import React from "react";
import SocialLogin from "./SocialLogin";
import EmailLogin from "./EmailLogin";

const Login = props => {
  return (
    <div className="container-fluid">
      <h1>Login</h1>
      <SocialLogin handleLogin={props.handleLogin} />
      <EmailLogin handleLogin={props.handleLogin} />
      {props.errMsg && <div className="login-error error">{props.errMsg}</div>}
    </div>
  );
};

export default Login;
