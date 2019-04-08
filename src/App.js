import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";
import "./css/app.css";

//import LandingPage from "./components/landingPage";
//import TopNavBar from "./components/topNavBar";
import Siteheader from "./components/Header/Siteheader";
import Footer from "./components/Footer/Footer";
import Sitebody from "./components/Body/Sitebody";
import Details from "./components/Details/Details";
import SkillSetup from "./components/Skill/SkillSetup/";
import CompanySetup from "./components/CompanySetup/";
import CandidateSetup from "./components/CandidateSetup/";
import PersonSetup from "./components/PersonSetup/";
import Login from "./components/login";
import Signup from "./components/signup";

// eslint-disable-next-line
import Error404 from "./components/error404";

import { library } from "@fortawesome/fontawesome-svg-core";
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
  faCheck
);

// setup global api url
// if not on my dev, use remote api
window.apiUrl = "http://localhost/3sixd/api/";
//window.apiUrl = "https://ronbout.000webhostapp.com/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <div id="header">
          <Siteheader />
        </div>
        <div id="body">
          <React.Fragment>
            <Switch>
              <Route path="/skill/setup" render={() => <SkillSetup />} />
              <Route
                path="/candidate/setup"
                render={() => <CandidateSetup />}
              />
              <Route path="/company/setup" render={() => <CompanySetup />} />
              <Route path="/person/setup" render={() => <PersonSetup />} />
              <Route path="/signin" render={() => <Login />} />
              <Route path="/register" render={() => <Signup />} />
              <Route exact path="/" component={Sitebody} />
            </Switch>
          </React.Fragment>
        </div>
        <div id="details">
          <Details />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
