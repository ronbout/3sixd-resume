import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";
import "./css/app.css";

import Siteheader from "./components/Siteheader/";
import Footer from "./components/Footer/";
import Sitebody from "./components/Sitebody/";
import Details from "./components/Details/";
import SkillSetup from "./components/SkillSetup/";
import CompanySetup from "./components/CompanySetup/";
import CandidateSetup from "./components/CandidateSetup/";
import PersonSetup from "./components/PersonSetup/";
import Login from "./components/Login/";
import Signup from "./components/Signup/";

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
//window.apiUrl = "http://localhost/3sixd/api/";
window.apiUrl = "https://ronbout.000webhostapp.com/api/";

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
          <Switch>
            <Route path="/skill/setup" render={() => <SkillSetup />} />
            <Route path="/candidate/setup" render={() => <CandidateSetup />} />
            <Route path="/company/setup" render={() => <CompanySetup />} />
            <Route path="/person/setup" render={() => <PersonSetup />} />
            <Route path="/signin" render={() => <Login />} />
            <Route path="/register" render={() => <Signup />} />
            <Route exact path="/" component={Sitebody} />
          </Switch>
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
