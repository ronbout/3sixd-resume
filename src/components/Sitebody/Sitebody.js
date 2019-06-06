import React from "react";
import Details from "../Details/";

import "./css/sitebody.css";

function Sitebody() {
  return (
    <React.Fragment>
      <div className="sitebody">
        <div id="jobSearch">
          <p>Keyword Search</p>
        </div>
        <div id="slogan">
          <h1>Jobs for IT Professionals</h1>
          <p>
            3sixD offers best-in-class positions for IT consulting and
            professionals looking for long term contract positions at top
            companies. We curate so you can find your next great job faster.
          </p>
        </div>
      </div>

      <div id="details">
        <Details />
      </div>
    </React.Fragment>
  );
}

export default Sitebody;
