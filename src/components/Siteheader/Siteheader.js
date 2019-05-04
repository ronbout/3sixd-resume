import React, { Component } from "react";
import Logo from "./Logo/";
import Navmenu from "./Navmenu";
import NavSignin from "./NavSignin";
import Burger from "./Slider/Burger";
import Slider from "./Slider/Slider";
import Backdrop from "./Backdrop/";

import "./css/siteheader.css";

class Siteheader extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="siteheader">
        <div id="logo">
          <Logo />
        </div>
        <div id="navbar">
          <Navmenu />
        </div>
        <div id="signin">
          <NavSignin />
        </div>
        <div id="burger">
          <Burger click={this.drawerToggleClickHandler} />
        </div>
        <Slider show={this.state.sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}

export default Siteheader;
