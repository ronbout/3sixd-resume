import React, { Component } from "react";
import Login from "./Login";

const API_MEMBERS = "members";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiBase: window.apiUrl,
      errMsg: ""
    };

    // check for query string in case this is the github callback from the server
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (email) {
      console.log("oauthType: ", sessionStorage.getItem("oauthType"));
      /**
       * we came here with an email in the query string so it is a github callback
       * just run the handleLogin routine with the email and "social" as the password
       */
      this.handleLogin(email, "social");
    } else {
      /**
       * set the sessionStorage so that if github login is used, the callback
       * routine will know to redirect to this path / component
       */

      sessionStorage.setItem("oauthType", "login");
    }
  }

  handleLogin = (email, password) => {
    fetch(
      `${
        this.state.apiBase
      }${API_MEMBERS}${API_QUERY}&password=${password}&email=${email}`
    )
      .then(response => {
        response.json().then(result => {
          // need to check for user not found
          console.log("result: ", result.data);
          if (result.data) {
            this.props.handleLogin(result);
          } else {
            // no user, so prepare error message
            this.setState({ errMsg: "Unknown User Email" });
          }
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  };

  render() {
    return <Login errMsg={this.state.errMsg} handleLogin={this.handleLogin} />;
  }
}

export default LoginContainer;
