import React from "react";

const EmailRegisterForm = props => {
  return (
    <div className="email-register register-section">
      <h4>Register by Email</h4>
      <div className="email-register-form">
        <label>Name: </label>
        <input
          type="text"
          placeholder="Full name"
          name="name"
          value={props.state.formFields.name}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        />
        <div />
        <div className="form-err">
          {props.state.nameErr && "Name is required."}
        </div>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={props.state.formFields.email}
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
          placeholder="Password"
          name="password"
          value={props.state.formFields.password}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={props.state.formFields.password2}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        />

        <div />
        <div className="form-err">
          {props.state.passErr && "Passwords are required and must match"}
        </div>
      </div>
      <button
        onClick={props.handleSubmit}
        className="btn btn-primary"
        disabled={props.state.passErr || props.state.emailErr}
      >
        Register with Email
      </button>
    </div>
  );
};

export default EmailRegisterForm;
