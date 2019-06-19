import React, { Component } from "react";

import PersonalInfo from "./PersonalInfo/";
import "./css/candidateProfile.css";

class CandidateProfile extends Component {
  state = {};
  render() {
    return (
      <div className="tsd-container candidate-profile">
        <h1>Candidate Profile Page</h1>
        <PersonalInfo />
      </div>
    );
  }
}

export default CandidateProfile;
