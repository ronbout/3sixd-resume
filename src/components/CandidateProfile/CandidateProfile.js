import React, { Component } from "react";

import PersonalInfo from "./PersonalInfo/";
import ObjectiveSummary from "./ObjectiveSummary";
import Highlights from "./ProfileHighlights";
import Experience from "./Experience";
import Education from "./Education";
import { candidateInfo } from "./dummyData";
import "./css/candidateProfile.css";
import { objCopy } from "../../assets/js/library";

class CandidateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...candidateInfo
    };
    this.state.origForm = objCopy(this.state.formFields);
  }

  handleUpdate = updateObj => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        ...updateObj
      }
    });
  };

  render() {
    return (
      <div className="tsd-container candidate-profile">
        <h1>Candidate Profile Page</h1>
        <PersonalInfo state={this.state} />
        <ObjectiveSummary
          objective={this.state.formFields.objective}
          executiveSummary={this.state.formFields.executiveSummary}
          handleUpdate={this.handleUpdate}
        />
        <Highlights highlights={this.state.formFields.candidateHighlights} />
        <Experience state={this.state} />
        <Education state={this.state} />
      </div>
    );
  }
}

export default CandidateProfile;
