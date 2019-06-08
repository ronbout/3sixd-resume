import React, { Component } from "react";
import { isEmail } from "../../assets/js/library";

class EmailRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      emailErr: false,
      passErr: false,
      nameErr: false
    };
  }
  handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      this.handleSubmit();
    }
  };

  handleSubmit = event => {
    event && event.preventDefault();
    const nameValid = this.state.formFields.name !== "";
    const emailValid = isEmail(this.state.formFields.email);
    const passValid =
      this.state.formFields.password === this.state.formFields.password2 &&
      this.state.formFields.password !== "";
    if (passValid && emailValid && nameValid) {
      this.props.handleRegister(this.state.formFields);
    } else {
      let errs = {};
      if (!emailValid) errs = { ...errs, emailErr: true };
      if (!passValid) errs = { ...errs, passErr: true };
      if (!nameValid) errs = { ...errs, nameErr: true };
      this.setState({ ...errs });
    }
  };

  handleInputChange = event => {
    const target = event.target;
    // test form and enable Submit if valid
    // provide error feedback
    let errs = {};
    if (target.name === "name" && target.value !== "") {
      errs = { ...errs, nameErr: false };
    }
    if (target.name === "email" && isEmail(target.value)) {
      errs = { ...errs, emailErr: false };
    }
    if (
      target.name === "password" ||
      (target.name === "password2" && target.value !== "")
    ) {
      // check for matching passwords
      const checkField = target.name === "password" ? "password2" : "password";
      if (this.state.formFields[checkField] === target.value) {
        errs = { ...errs, passErr: false };
      }
    }
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: target.value
      },
      ...errs
    });
  };

  render() {
    return (
      <div className="email-register register-section">
        <h4>Register by Email</h4>
        <div className="email-register-form">
          <label>Name: </label>
          <input
            type="text"
            placeholder="Full name"
            name="name"
            ref={this.nameInput}
            value={this.state.formFields.name}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <div />
          <div className="form-err">
            {this.state.nameErr && "Name is required."}
          </div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.formFields.email}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <div />
          <div className="form-err">
            {this.state.emailErr && "Invalid Email"}
          </div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.formFields.password}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={this.state.formFields.password2}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />

          <div />
          <div className="form-err">
            {this.state.passErr && "Passwords are required and must match"}
          </div>
        </div>
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary"
          disabled={this.state.passErr || this.state.emailErr}
        >
          Register with Email
        </button>
      </div>
    );
  }
}

export default EmailRegister;
