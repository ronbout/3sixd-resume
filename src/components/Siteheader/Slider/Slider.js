import React from "react";
import Navmenu from "../Navmenu";
import NavSignin from "../NavSignin";

import "./css/slider.css";

const Slider = props => {
  let drawerClasses = "slider";

  if (props.show) {
    drawerClasses = "slider open";
  }

  return (
    <nav className={drawerClasses}>
      <Navmenu />
      <NavSignin />
    </nav>
  );
};

export default Slider;
