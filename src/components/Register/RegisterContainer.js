import React, { Component } from "react";
import Register from "./Register";
import { UserContext } from "../UserProvider";

const API_MEMBER = "members";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class RegisterContainer extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      apiBase: window.apiUrl,
      errMsg: "",
      confirmMsg: "",
      socialFlag: false
    };
  }

  handleRegister = (userInfo, site = false) => {
    console.log("userInfo: ", userInfo);
    // clear out any error msg
    this.setState({ errMsg: "", confirmMsg: "" });
    let postBody = { ...userInfo };
    delete postBody.password2;
    let postConfig = {
      method: "post",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`${this.state.apiBase}${API_MEMBER}${API_QUERY}`, postConfig)
      .then(response => {
        console.log("response: ", response);
        response.json().then(result => {
          if (result.error) {
            this.setState({
              errMsg:
                result.errorCode === 23000
                  ? `Email ${userInfo.email} is already a registered user.`
                  : result.message
            });
          } else {
            console.log("Result: ", result);
            // success.  let user know and log them in
            // get UserContext and log the user in
            this.setState(
              {
                confirmMsg: site
                  ? "You have been successfully registered through " +
                    site +
                    "."
                  : "You have been successfully registered.  Please check your email for confirmation."
              },
              () => this.context.handleLogin(result, null, false)
            );
          }
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  };

  render() {
    return (
      <Register
        confirmMsg={this.state.confirmMsg}
        handleRegister={this.handleRegister}
        errMsg={this.state.errMsg}
      />
    );
  }
}

export default RegisterContainer;
