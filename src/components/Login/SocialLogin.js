import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*   responseFacebook = resp => {
    this.props.handleLogin(resp.email, "social");
  }; */

  responseGoogle = resp => {
    // since prototype, just cheat on email as I use yahoo, not google
    console.log("google resp: ", resp.profileObj);
    //  email, familyName, givenName, googleId, imageUrl, name
    this.props.handleLogin(resp.profileObj.email, "google");
  };

  render() {
    return (
      <div className="social-login login-section">
        <h4>Sign In with Social Media</h4>
        <div>
          <a
            className="App-link"
            href="https://github.com/login/oauth/authorize?client_id=b86fdc8d2ff6d5f7f394&scope=user:email"
          >
            <button className="github-button">
              <FontAwesomeIcon icon={["fab", "github"]} />
              <span style={{ marginLeft: "16px" }}>Login with Github</span>
            </button>
          </a>
        </div>
        <div>
          <GoogleLogin
            clientId="339494038360-ui9ssd3umvcj4fkjft7ns4ies220l8l3.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
      </div>
    );
  }
}

export default SocialLogin;
