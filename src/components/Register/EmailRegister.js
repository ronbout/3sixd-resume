import React, { Component } from "react";
import { isEmail } from "../../assets/js/library";

class EmailSignup extends Component {
  constructor(props) {
    super(props);
    // set up ref for assigning focus
    this.fullNameInput = React.createRef();
    this.state = {
      formFields: {
        fullName: "",
        email: "",
        password: "",
        password2: ""
      },
      emailErr: false,
      passErr: false,
      socialFlag: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.socialInfo !== prevProps.socialInfo) {
      const socialInfo = this.props.socialInfo;
      this.setState({
        formFields: {
          ...prevState.formFields,
          fullName:
            socialInfo && socialInfo.fullName ? socialInfo.fullname : "",
          email: socialInfo && socialInfo.email ? socialInfo.email : ""
        },
        socialFlag: socialInfo ? true : false
      });
      socialInfo && this.fullNameInput.current.focus();
    }
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      this.handleSubmit();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const emailValid = isEmail(this.state.formFields.email);
    const passValid =
      this.state.formFields.password === this.state.formFields.password2;
    if (passValid && emailValid) {
      this.props.handleSignUp(this.state.formFields);
    } else {
      !emailValid && this.setState({ emailErr: true });
      !passValid && this.setState({ passErr: true });
    }
  };

  handleInputChange = event => {
    const target = event.target;
    // test form and enable Submit if valid
    // provide error feedback
    let errs = {};
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
            name="fullName"
            ref={this.fullNameInput}
            value={this.state.formFields.fullName}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          {!this.state.socialFlag && (
            <React.Fragment>
              <label>Email: </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.formFields.email}
                onChange={this.handleInputChange}
                disabled={this.state.socialFlag}
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
                {this.state.passErr && "Passwords much match"}
              </div>
            </React.Fragment>
          )}
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

export default EmailSignup;
