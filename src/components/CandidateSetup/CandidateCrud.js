import React, { Component } from "react";
import CandidatePerson from "./formSections/CandidatePerson";
import CandidateObjective from "./formSections/CandidateObjective";
import CandidateHighlights from "./formSections/CandidateHighlights";
import CandidateSkills1 from "./formSections/CandidateSkills1";
//import CandidateSkills2 from "./formSections/CandidateSkills2";
import CandidateExperience from "./formSections/CandidateExperience";
import CandidateEducation from "./formSections/CandidateEducation";
import CandidateLinks from "./formSections/CandidateLinks";
import CandidateModal from "./CandidateModal";
import TabbedUI from "../TabbedUI/";

// dummy data
const candidateInfo = {
  formFields: {
    id: 17,
    person: {
      givenName: "Fred",
      middleName: "",
      familyName: "Flintstone",
      affix: "",
      email1: "fred@stone.com",
      email2: "",
      primaryPhone: "",
      workPhone: "",
      addressLine1: "",
      addressLine2: "",
      municipality: "Bedrock",
      region: "",
      postalCode: "",
      countryCode: "",
      website: ""
    },
    objective:
      "Looking for great job working with dinosaurs with opportunities for advancement",
    executiveSummary: "I am a big, cartoon guy",
    highlights: [
      "This is a highlight",
      "And, here is another one",
      "Well, jeez, I guess I could list a third",
      "now this is just getting boring"
    ]
  }
};

const OBJECTIVE_NDX = 0;
const HIGHLIGHTS_NDX = 1;
const SKILLS_NDX = 2;
const EXPERIENCE_NDX = 3;
const LINKS_NDX = 4;
const EDUCATION_NDX = 5;

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
    executiveSummary: "",
    highlights: []
  }
};

class CandidateCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...candidateInfo,
      tabIndex: HIGHLIGHTS_NDX
    };
    this.state.origForm = this.state.formFields;
  }

  handleSubmit = event => {
    event.preventDefault();
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
    tabList[SKILLS_NDX] = { label: "Skills" };
    tabList[EXPERIENCE_NDX] = { label: "Experience" };
    tabList[LINKS_NDX] = { label: "Portfolio/Social" };
    tabList[EDUCATION_NDX] = { label: "Education" };

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
      case SKILLS_NDX:
        return (
          <CandidateSkills1
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
      case EXPERIENCE_NDX:
        return (
          <CandidateExperience
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
      case EDUCATION_NDX:
        return (
          <CandidateEducation
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
