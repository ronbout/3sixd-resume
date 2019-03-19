import React, { Component } from "react";
import CandidatePerson from "./formSections/CandidatePerson";
import CandidateObjective from "./formSections/CandidateObjective";
import CandidateHighlights from "./formSections/CandidateHighlights";
import CandidateSkills1 from "./formSections/CandidateSkills1";
import CandidateSkills2 from "./formSections/CandidateSkills2";
import CandidateLinks from "./formSections/CandidateLinks";
import CandidateModal from "./CandidateModal";
import TabbedUI from "../TabbedUI/";

const OBJECTIVE_NDX = 0;
const HIGHLIGHTS_NDX = 1;
const SKILLS1_NDX = 2;
const SKILLS2_NDX = 3;
const LINKS_NDX = 4;

const clearFormFields = {
  formFields: {
    id: "",
    person: {
      givenName: "",
      middleName: "",
      familyName: "",
      affix: "",
      email1: "",
      email2: "",
      primaryPhone: "",
      workPhone: "",
      addressLine1: "",
      addressLine2: "",
      municipality: "",
      region: "",
      postalCode: "",
      countryCode: "",
      website: ""
    },
    objective: "",
    executiveSummary: ""
  }
};

class CandidateCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields,
      tabIndex: 0
    };
    this.state.origForm = this.state.formFields;
  }

  handleSubmit = () => {
    console.log("submitted");
  };

  handleClear = () => {
    this.setState({
      ...clearFormFields,
      origForm: clearFormFields.formFields
    });
  };

  handleTabClick = tabIndex => {
    if (tabIndex === this.state.tabIndex) return;
    this.setState({
      tabIndex
    });
  };

  handleInputChange = (event, obj = null) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let errs = {};
    if (obj) {
      this.setState(prevState => {
        const prevObj = prevState.formFields[obj];
        return {
          formFields: {
            ...prevState.formFields,
            [obj]: {
              ...prevObj,
              [target.name]: value
            }
          }
        };
      });
    } else {
      this.setState({
        formFields: {
          ...this.state.formFields,
          [target.name]: value
        },
        ...errs
      });
    }
  };

  render() {
    return (
      <div className="candidate-setup">
        <form className="candidate-form" onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.formFields.id} />
          <CandidatePerson
            objName="person"
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
          {this.candidateDetails()}
          {this.buttonSection()}
        </form>
        <CandidateModal />
      </div>
    );
  }

  candidateDetails() {
    const tabList = [];
    tabList[OBJECTIVE_NDX] = { label: "Objective" };
    tabList[HIGHLIGHTS_NDX] = { label: "Highlights" };
    tabList[SKILLS1_NDX] = { label: "Skills 1" };
    tabList[SKILLS2_NDX] = { label: "Skills 2" };
    tabList[LINKS_NDX] = { label: "Portfolio/Social" };

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
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case HIGHLIGHTS_NDX:
        return (
          <CandidateHighlights
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case SKILLS1_NDX:
        return (
          <CandidateSkills1
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case SKILLS2_NDX:
        return (
          <CandidateSkills2
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case LINKS_NDX:
        return (
          <CandidateLinks
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      default:
        return null;
    }
  }

  buttonSection() {
    return (
      <div className="fs-btn-container" style={{ textAlign: "center" }}>
        <button className="btn btn-primary">
          {this.state.formFields.id === "" ? "Add skill" : "Update skill"}
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={this.handleClear}
        >
          Clear Form
        </button>
        <button
          type="button"
          className="btn btn-info"
          data-toggle="modal"
          data-target="#notesModal"
        >
          Test Modal
        </button>
      </div>
    );
  }
}

export default CandidateCrud;
