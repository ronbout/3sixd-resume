import React, { Component } from "react";
import Register from "./Register";
import { UserContext } from "../UserProvider";

const API_MEMBER = "members";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class RegisterContainer extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    /**
     *
     * **** add url parameters for github redirect from githubCallback
     * same code as LoginContainer
     *
     *
     */

    // check for query string in case this is the github callback from the server
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const name = urlParams.get("name");

    this.state = {
      apiBase: window.apiUrl,
      errMsg: "",
      confirmMsg: "",
      socialFlag: false
    };

    if (email && name) {
      console.log("oauthType: ", sessionStorage.getItem("oauthType"));
      /**
       * we came here with an email and name in the query string so it is a github callback
       * just run the handleRegsiter routine with the email, name and "github" as the password
       */
      const userInfo = { name, email, password: "github" };
      this.handleRegister(userInfo, "Github");
    } else {
      /**
       * set the sessionStorage so that if github login is used, the callback
       * routine will know to redirect to this path / component
       */
      sessionStorage.setItem("oauthType", "register");
    }
  }

  handleRegister = (userInfo, site = false) => {
    sessionStorage.removeItem("oauthType");
    console.log("Register userInfo: ", userInfo);
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
                  : result.message,
              confirmMsg: ""
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
                  : "You have been successfully registered.  Please check your email for confirmation.",
                errMsg: ""
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
