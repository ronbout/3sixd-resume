import React, { Component } from "react";
import Register from "./Register";
import { candidateCreate } from "../CandidateSetup/candidateCreate";
import { UserContext } from "../UserProvider";
import dataFetch from "../../assets/js/dataFetch";

const API_MEMBER = "members";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class RegisterContainer extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

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

  handleRegister = async (userInfo, site = false) => {
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
            /**
             * have to split name out into first last
             * github does not break it out so not trying
             * to force first and last just to register
             */
            result = result.data;
            const names = result.fullName
              .trim()
              .replace(/\s+/g, ",")
              .split(",");
            const givenName = names[0];
            const familyName = names.length > 1 ? names[1] : names[0];
            const personInfo = {
              givenName,
              familyName,
              email1: result.email
            };
            candidateCreate(personInfo).then(createResp => {
              console.log("create candidate response: ", createResp);
              // success.  let user know and log them in
              // get UserContext and log the user in with new candidate Id

              /**
               *
               * need to update members table now with the candidate id
               * have to do it in this order as I cannot create candidate
               * w/o knowing that it is a legitimate member.
               *
               *
               */
              result.candidateId = createResp.id;

              const endpoint = `${API_MEMBER}/${result.id}`;
              const body = {
                candidateId: result.candidateId
              };
              const httpMethod = "PUT";
              dataFetch(endpoint, "", httpMethod, body).then(membersUpdate => {
                if (membersUpdate.error) {
                  console.log("Error update Members table: ", membersUpdate);
                }
              });

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
            });
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
