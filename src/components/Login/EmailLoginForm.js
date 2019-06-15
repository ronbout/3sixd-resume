import React from "react";

const EmailLoginForm = props => {
  return (
    <div className="email-login login-section">
      <h4>Sign In by Email</h4>
      <div className="email-login-form">
        <label>Email: </label>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={props.state.email}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        />
        <div />
        <div className="form-err">
          {props.state.emailErr && "Invalid Email"}
        </div>

        <label>Password:</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={props.state.password}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        />
      </div>

      <button onClick={props.handleSubmit} className="btn btn-primary">
        Login with Email
      </button>
    </div>
  );
};

export default EmailLoginForm;
