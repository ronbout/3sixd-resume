import React from "react";
import Navmenu from "../Siteheader/Navmenu";

import "./css/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div id="copywrite">@ 2019 3SIXD CONSULTING - ALL RIGHTS RESERVERD</div>
      <div id="privacy">Privacy Policy</div>
      <div id="footnav">
        <Navmenu />
      </div>
    </div>
  );
};

export default Footer;
