import React from "react";

import "./css/burger.css";

const Burger = props => (
  <button className="burger" onClick={props.click}>
    <div className="burger_line" />
    <div className="burger_line" />
    <div className="burger_line" />
  </button>
);

export default Burger;
