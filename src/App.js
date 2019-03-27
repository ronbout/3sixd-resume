import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";
import "./css/app.css";

//import LandingPage from "./components/landingPage";
//import TopNavBar from "./components/topNavBar";
import Siteheader from './components/Header/Siteheader';
import Sitebody from './components/Body/Sitebody';
import SkillSetup from "./components/SkillSetup/";
import CandidateSetup from "./components/CandidateSetup/";

// eslint-disable-next-line
import Error404 from "./components/error404";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faQuestion,
  faSearch,
  faArrowUp,
  faArrowDown,
  faChevronDown,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faQuestion,
  faSearch,
  faArrowUp,
  faArrowDown,
  faChevronDown,
  faEdit
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
        <div id="header"><Siteheader /></div>
        <div id="body">
          <React.Fragment>
            <Switch>
                <Route path="/skill/setup" render={() => <SkillSetup />} />
                <Route path="/candidate/setup" render={() => <CandidateSetup />} />
                <Route exact path="/" component={Sitebody} />
                <Route exact path="/" component={Sitebody} />
            </Switch>
          </React.Fragment>
        </div>
        <div id="details"> - details - </div>
        <div id="footer"> - footer - </div>
      </div>
    );
  }
}

export default withRouter(App);
