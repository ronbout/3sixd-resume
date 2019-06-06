import React, { Component } from "react";
import { isEmail } from "../../assets/js/library";

class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", emailErr: false };
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      this.handleSubmit();
    }
  };

  handleSubmit = event => {
    event && event.preventDefault();
    const emailValid = isEmail(this.state.email);
    if (emailValid) {
      this.props.handleLogin(this.state.email, this.state.password);
    } else {
      this.setState({ emailErr: true });
    }
  };

  handleInputChange = event => {
    const target = event.target;
    let errs = {};
    if (target.name === "email" && isEmail(target.value)) {
      errs = { ...errs, emailErr: false };
    }
    this.setState({
      [target.name]: target.value,
      ...errs
    });
  };

  render() {
    return (
      <div className="email-login login-section">
        <h4>Sign In by Email</h4>
        <div className="email-login-form">
          <label>Email: </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
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
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>

        <button onClick={this.handleSubmit} className="btn btn-primary">
          Login with Email
        </button>
      </div>
    );
  }
}

export default EmailLogin;
