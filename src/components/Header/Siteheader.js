import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import Navmenu from '../Navmenu/Navmenu';
import Signin from '../Signin/Signin';
import Burger from '../Slider/Burger';
import Slider from '../Slider/Slider';
import Backdrop from '../Backdrop/Backdrop';

import "./siteheader.css";

class Siteheader extends Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };

	render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler} />
        }

		return (
			<div className="siteheader">
				<div id="logo"><Logo /></div>
				<div id="navbar"><Navmenu /></div>
				<div id="signin"><Signin /></div>
				<div id="burger"><Burger click={this.drawerToggleClickHandler} /></div>
				<Slider show={this.state.sideDrawerOpen} />
                {backdrop}
			</div>
		)
	}
}

export default Siteheader;
