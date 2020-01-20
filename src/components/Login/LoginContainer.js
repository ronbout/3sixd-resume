import React, { Component } from "react";
import Login from "./Login";
import { UserContext } from "../UserProvider";
import dataFetch from "../../assets/js/dataFetch";
import { isEmptyObject } from "assets/js/library";
import Snackbar from "styledComponents/Snackbar";

const API_MEMBERS = "members";

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
			referrer,
			toast: {}
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

	handleLogin = async (email, password) => {
		this.closeToast();
		const endpoint = API_MEMBERS;
		const queryStr = `&password=${password}&email=${email}`;
		let errMsg = "";

		const result = await dataFetch(endpoint, queryStr);
		if (result.error) {
			if (result.errorCode && result.errorCode === 45002) {
				errMsg = "Email " + email + " not found.";
			} else {
				errMsg = result.message;
			}
			this.setState({ errMsg });
			this.addToast(errMsg, "Close", false);
			console.log(result);
		} else {
			let loginReferrer;

			if (result.securityLevel > 1) {
				loginReferrer = "/candidate-list";
			} else {
				if (!result.candidateId) {
					loginReferrer = "/";
				} else {
					loginReferrer =
						this.state.referrer &&
						(this.state.referrer === "/profile" ||
							this.state.referrer === "/cand-skills")
							? `${this.state.referrer}/${result.candidateId}`
							: this.state.referrer
							? this.state.referrer
							: `/profile/${result.candidateId}`;
				}
			}

			sessionStorage.removeItem("referrer");
			sessionStorage.removeItem("oauthType");
			this.context.handleLogin(result, loginReferrer);
		}
	};

	componentWillUnmount = () => {
		sessionStorage.removeItem("referrer");
	};

	addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		this.setState({ toast });
	};

	closeToast = () => {
		this.setState({ toast: {} });
	};

	render() {
		return (
			<React.Fragment>
				<Login errMsg={this.state.errMsg} handleLogin={this.handleLogin} />
				{isEmptyObject(this.state.toast) || (
					<Snackbar
						text={this.state.toast.text}
						action={this.state.toast.action}
						autohide={this.state.toast.autoHide}
						timeout={this.state.toast.timeout}
						closeCallBk={this.closeToast}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default LoginContainer;
