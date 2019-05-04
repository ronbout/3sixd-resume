import React from "react";

import "./css/logo.css";

function Logo() {
  return (
    <div className="logo">
      <a href="/">
        <img
          className="mascot"
          alt="3sixD"
          src={require("./assets/img/3sixD_Mascot.png")}
        />
      </a>
    </div>
  );
}

export default Logo;
