import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";

import LandingPage from "./components/landingPage";
import TopNavBar from "./components/topNavBar";
import SkillSetup from "./components/SkillSetup/";
import CandidateSetup from "./components/CandidateSetup/";
// eslint-disable-next-line
import Error404 from "./components/error404";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faQuestion, faSearch);

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
      <React.Fragment>
        <TopNavBar user={this.state.user} />
        <Switch>
          <Route path="/skill/setup" render={() => <SkillSetup />} />
          <Route path="/candidate/setup" render={() => <CandidateSetup />} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
