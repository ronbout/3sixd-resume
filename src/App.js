import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";
import "./css/app.css";

import Error_404 from "./components/Error_404";
import Siteheader from "components/Siteheader/";
import Footer from "./components/Footer/";
import Sitebody from "./components/Sitebody/";
import SkillSetup from "./components/SkillSetup/";
import CompanySetup from "./components/CompanySetup/";
import CandidateSetup from "./components/CandidateSetup/";
import CandidateProfile from "./components/CandidateProfile/";
import CandidateSkills from "./components/CandidateSkills/";
import PersonSetup from "./components/PersonSetup/";
import LoginContainer from "./components/Login/";
import Register from "./components/Register/";
import GithubCallback from "./components/GithubCallback";
import PrivateRoute from "./components/PrivateRoute";
import { UserContext } from "./components/UserProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
	faQuestion,
	faSearch,
	faArrowUp,
	faArrowDown,
	faChevronDown,
	faEdit,
	faPlus,
	faCheck
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faQuestion,
	faSearch,
	faArrowUp,
	faArrowDown,
	faChevronDown,
	faEdit,
	faPlus,
	faCheck,
	fab
);

// setup global api url
// if not on my dev, use remote api
//window.apiUrl = "http://localhost/3sixd/api/";
window.apiUrl = "http://13.90.143.153/3sixd/api/";

//window.resumeUrl = "http://localhost/3sixd/resume-build/resume-pdf.php";
window.resumeUrl = "http://13.90.143.153/3sixd/resume-build/resume-pdf.php";

class App extends Component {
	constructor(props) {
		super(props);
		const storedUser = sessionStorage.getItem("user");
		const userInfo = storedUser ? JSON.parse(storedUser) : false;
		this.state = {
			userInfo
		};
	}

	handleLogin = (resp, loc = "/", push = true) => {
		loc = loc === null ? "/" : loc;
		// add to session storage
		sessionStorage.setItem("user", JSON.stringify(resp));
		this.setState(
			{
				userInfo: resp
				// id, fullName, email, confirmFlag, securityLevel, candidateId
			},
			() => push && this.props.history.push(loc)
		);
	};

	handleLogout = (loc = "/") => {
		// add to session storage
		sessionStorage.setItem("user", false);
		this.setState(
			{
				userInfo: false
				// id, fullName, email, confirmFlag, securityLevel, candidateId
			},
			() => {
				sessionStorage.removeItem("referrer");
				//this.props.history.push(loc);
			}
		);
	};

	render() {
		const authValue = {
			userInfo: this.state.userInfo,
			handleLogin: this.handleLogin,
			handleLogout: this.handleLogout
		};
		return (
			<UserContext.Provider value={authValue}>
				<div className="app">
					<header id="header">
						<Siteheader />
					</header>
					<main id="body">
						<Switch>
							<PrivateRoute path="/skill/setup" component={SkillSetup} />
							<PrivateRoute
								path="/candidate/setup"
								component={CandidateSetup}
							/>
							<PrivateRoute path="/company/setup" component={CompanySetup} />
							<PrivateRoute path="/person/setup" component={PersonSetup} />
							<Route path="/signin" component={LoginContainer} />
							<Route path="/register" component={Register} />
							<Route path="/github/callback" component={GithubCallback} />
							<Route exact path="/" component={Sitebody} />
							<PrivateRoute
								path="/profile/:candId"
								component={CandidateProfile}
							/>
							<PrivateRoute
								path="/cand-skills/:candId"
								component={CandidateSkills}
							/>
							<PrivateRoute path="/profile" component={CandidateProfile} />
							<Route component={Error_404} />
						</Switch>
					</main>
					<footer id="footer">
						<Footer />
					</footer>
				</div>
			</UserContext.Provider>
		);
	}
}

export default withRouter(App);
