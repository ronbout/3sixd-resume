import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class socialSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  responseGoogle = resp => {
    // get name and email, send up to parent to transfer to email form
    console.log("google resp: ", resp.profileObj);
    //  email, familyName, givenName, googleId, imageUrl, name
    const googleInfo = {
      firstName: resp.profileObj.givenName,
      lastName: resp.profileObj.familyName,
      email: resp.profileObj.email
    };
    this.props.handleSocial(googleInfo);
  };

  render() {
    return (
      <React.Fragment>
        <div className="social-register register-section">
          <h4>Register with Social Media</h4>
          <div>
            <a
              className="App-link"
              href="https://github.com/login/oauth/authorize?client_id=b86fdc8d2ff6d5f7f394&scope=user:email"
            >
              <button className="github-button">
                <FontAwesomeIcon icon={["fab", "github"]} />
                <span style={{ marginLeft: "16px" }}>Register with Github</span>
              </button>
            </a>
          </div>
          <div>
            <GoogleLogin
              clientId="339494038360-ui9ssd3umvcj4fkjft7ns4ies220l8l3.apps.googleusercontent.com"
              buttonText="Register with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default socialSignup;
