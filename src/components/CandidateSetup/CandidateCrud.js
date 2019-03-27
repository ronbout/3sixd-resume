import React, { Component } from "react";
import CandidatePerson from "./formSections/CandidatePerson";
import CandidateObjective from "./formSections/CandidateObjective";
import CandidateHighlights from "./formSections/CandidateHighlights";
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
      {
        id: 1,
        highlight: "This is a highlight",
        skills: [{ id: 1, name: "Powerbuilder" }]
      },
      {
        id: 2,
        highlight: "And, here is another one",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }]
      },
      {
        id: 3,
        highlight: "Well, jeez, I guess I could list a third",
        skills: [{ id: 103, name: "Cisco" }]
      },
      {
        id: 4,
        highlight: "now this is just getting boring",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ]
      },
      {
        id: 5,
        highlight: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
        skills: [{ id: 1, name: "Powerbuilder" }]
      },
      {
        id: 6,
        highlight: "Lorem ipsum dolor sit amet.",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }]
      },
      {
        id: 7,
        highlight: "There was an old maid from Peru, who swore that she.....",
        skills: [{ id: 103, name: "Cisco" }]
      },
      {
        id: 8,
        highlight: "Last one",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ]
      }
    ]
  }
};

const PERSONAL_NDX = 0;
const OBJECTIVE_NDX = 1;
const HIGHLIGHTS_NDX = 2;
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

  handleHighlightChange = highlights => {
    this.setState(prevState => {
      return {
        formFields: {
          ...prevState.formFields,
          highlights
        }
      };
    });
  };

  render() {
    return (
      <div className="candidate-setup">
        <form className="candidate-form" onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.formFields.id} />

          {this.candidateDetails()}
          {this.buttonSection()}
        </form>
        <CandidateModal />
      </div>
    );
  }

  candidateDetails() {
    const tabList = [];
    tabList[PERSONAL_NDX] = { label: "Personal" };
    tabList[OBJECTIVE_NDX] = { label: "Objective" };
    tabList[HIGHLIGHTS_NDX] = { label: "Highlights" };
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
      case PERSONAL_NDX:
        return (
          <CandidatePerson
            objName="person"
            formFields={this.state.formFields}
            handleInputChange={this.handleInputChange}
          />
        );
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
            handleHighlightChange={this.handleHighlightChange}
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
