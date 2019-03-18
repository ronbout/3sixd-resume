import React, { Component } from "react";
import CandidatePerson from "./formSections/CandidatePerson";
import CandidateObjective from "./formSections/CandidateObjective";
import CandidateHighlights from "./formSections/CandidateHighlights";
import CandidateSkills1 from "./formSections/CandidateSkills1";
import CandidateSkills2 from "./formSections/CandidateSkills2";
import TabbedUI from "../TabbedUI/";

const OBJECTIVE_NDX = 0;
const HIGHLIGHTS_NDX = 1;
const SKILLS1_NDX = 2;
const SKILLS2_NDX = 3;

const clearFormFields = {
  formFields: {
    id: "",
    givenName: "",
    middleName: "",
    familyName: "",
    affix: ""
  }
};

class CandidateCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields,
      tabIndex: 0
    };
  }

  handleSubmit = () => {
    console.log("submitted");
  };

  handleTabClick = tabIndex => {
    if (tabIndex === this.state.tabIndex) return;
    this.setState({
      tabIndex
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let errs = {};
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: value
      },
      ...errs
    });
  };

  render() {
    return (
      <div className="candidate-setup">
        <form className="candidate-form" onSubmit={this.handleSubmit}>
          <CandidatePerson
            fields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
          {this.candidateDetails()}
        </form>
      </div>
    );
  }

  candidateDetails() {
    const tabList = [
      { label: "Objective" },
      { label: "Highlights" },
      { label: "Skills 1" },
      { label: "Skills 2" }
    ];
    return (
      <div className="candidate-details-section">
        <TabbedUI
          tabs={tabList}
          tabIndex={this.state.tabIndex}
          handleTabClick={this.handleTabClick}
        />
        <div className="tab-section">{this.tabSection()}</div>
      </div>
    );
  }

  tabSection() {
    switch (this.state.tabIndex) {
      case OBJECTIVE_NDX:
        return (
          <CandidateObjective
            fields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case HIGHLIGHTS_NDX:
        return (
          <CandidateHighlights
            fields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case SKILLS1_NDX:
        return (
          <CandidateSkills1
            fields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case SKILLS2_NDX:
        return (
          <CandidateSkills2
            fields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      default:
        return null;
    }
  }
}

export default CandidateCrud;
