import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./css/styles.css";

import LandingPage from "./components/landingPage";
import TopNavBar from "./components/topNavBar";
import SkillSearch from "./components/skillSearch";
import SkillSetup from "./components/skillSetup";
// eslint-disable-next-line
import Error404 from "./components/error404";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faQuestion, faSearch);

// setup global api url
window.apiUrl = "http://localhost/3sixd/api/";

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
          <Route
            path="/skill/setup"
            render={() => (
              <SkillSetup
                user={this.state.user}
                handleFoodSelect={this.handleFoodSelect}
              />
            )}
          />
          <Route
            path="/skill/search"
            render={() => (
              <SkillSearch
                user={this.state.user}
                handleFoodSelect={this.handleFoodSelect}
              />
            )}
          />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
