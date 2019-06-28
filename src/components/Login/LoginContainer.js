import React, { Component } from "react";
import Login from "./Login";
import { UserContext } from "../UserProvider";

const API_MEMBERS = "members";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class LoginContainer extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    // check for query string in case this is the github callback from the server
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    let referrer = urlParams.get("referrer");
    console.log("url referrer: ", referrer);
    if (!referrer) {
      // check session storage
      if ((referrer = sessionStorage.getItem("referrer"))) {
        console.log("session referrer: ", referrer);
      }
    }

    this.state = {
      apiBase: window.apiUrl,
      errMsg: referrer ? "You must be logged in to access that page" : "",
      referrer
    };

    if (email) {
      console.log("oauthType: ", sessionStorage.getItem("oauthType"));
      /**
       * we came here with an email in the query string so it is a github callback
       * just run the handleLogin routine with the email and "github" as the password
       */
      this.handleLogin(email, "github");
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
            const loginReferrer = this.state.referrer
              ? this.state.referrer
              : `/candidate/setup/${result.data.id}`;
            sessionStorage.removeItem("referrer");
            sessionStorage.removeItem("oauthType");
            this.context.handleLogin(result, loginReferrer);
          } else {
            if (result.errorCode && result.errorCode === 45002) {
              this.setState({ errMsg: "Email " + email + " not found." });
            } else {
              this.setState({ errMsg: result.message });
            }
          }
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  };

  componentWillUnmount = () => {
    sessionStorage.removeItem("referrer");
  };

  render() {
    return <Login errMsg={this.state.errMsg} handleLogin={this.handleLogin} />;
  }
}

export default LoginContainer;
