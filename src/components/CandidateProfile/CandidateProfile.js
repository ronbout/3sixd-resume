import React, { Component } from "react";

import PersonalInfo from "./PersonalInfo/";
import ObjectiveSummary from "./ObjectiveSummary";
import Highlights from "./ProfileHighlights";
import Experience from "./Experience";
import Education from "./Education";
import { candidateInfo } from "./dummyData";
import "./css/candidateProfile.css";
import { objCopy, convertNullsToEmpty } from "../../assets/js/library";

const API_CANDIDATES = "candidates";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class CandidateProfile extends Component {
  constructor(props) {
    super(props);

    // check for candidate id being passed in as url parm
    // if no such parm, then must be add mode
    const candId = props.match.params.candId;
    this.state = {
      apiBase: window.apiUrl,
      formFields: candidateInfo,
      candId
    };
    this.state.origForm = objCopy(this.state.formFields);
  }

  componentDidMount() {
    // if candId exists, then pull from the api
    this.state.candId !== "undefined" &&
      this.loadCandidateInfo(this.state.candId);
  }

  loadCandidateInfo = candId => {
    const apiUrl = `${
      this.state.apiBase
    }${API_CANDIDATES}/${candId}${API_QUERY}`;
    fetch(apiUrl)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // need to convert nulls to "" for react forms
          result && (result = convertNullsToEmpty(result));
          console.log("result: ", result);
          this.setState({
            formFields: result ? result : candidateInfo
          });
        });
      })
      .catch(error => {
        console.log("Candidate Fetch error: ", error);
      });
  };

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
        <PersonalInfo
          person={this.state.formFields.person}
          handleUpdate={this.handleUpdate}
        />
        <ObjectiveSummary
          objective={this.state.formFields.objective}
          executiveSummary={this.state.formFields.executiveSummary}
          handleUpdate={this.handleUpdate}
        />
        <Highlights
          highlights={this.state.formFields.candidateHighlights}
          handleUpdate={this.handleUpdate}
        />
        <Experience
          experience={this.state.formFields.experience}
          handleUpdate={this.handleUpdate}
          candId={this.state.candId}
        />
        <Education
          education={this.state.formFields.education}
          handleUpdate={this.handleUpdate}
          candId={this.state.candId}
        />
      </div>
    );
  }
}

export default CandidateProfile;
