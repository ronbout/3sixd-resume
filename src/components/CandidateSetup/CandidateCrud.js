import React, { Component } from "react";
import CandidatePerson from "./formSections/CandidatePerson";
import CandidateObjective from "./formSections/CandidateObjective";
import Highlights from "./formSections/Highlights";
import CandidateExperience from "./formSections/CandidateExperience";
import CandidateEducation from "./formSections/CandidateEducation";
import CandidateLinks from "./formSections/CandidateLinks";
import TabbedUI from "../TabbedUI/";

import { objCopy } from "../../assets/js/library";

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
        skills: [{ id: 1, name: "Powerbuilder" }],
        sequence: 2
      },
      {
        id: 2,
        highlight: "And, here is another one",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
        sequence: 1
      },
      {
        id: 3,
        highlight: "Well, jeez, I guess I could list a third",
        skills: [{ id: 103, name: "Cisco" }],
        sequence: 4
      },
      {
        id: 4,
        highlight: "now this is just getting boring",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ],
        sequence: 7
      },
      {
        id: 5,
        highlight: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
        skills: [{ id: 1, name: "Powerbuilder" }],
        sequence: 8
      },
      {
        id: 6,
        highlight: "Lorem ipsum dolor sit amet.",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
        sequence: 9
      },
      {
        id: 7,
        highlight: "There was an old maid from Peru, who swore that she.....",
        skills: [{ id: 103, name: "Cisco" }],
        sequence: 11
      },
      {
        id: 8,
        highlight: "Last one",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ],
        sequence: 14
      }
    ],
    experience: [
      {
        id: 2,
        candidateId: 17,
        company: {
          id: 18,
          name: "WordPress Specialists",
          description: "WordPress and Theme Specialists"
        },
        startDate: "2015-05-22",
        endDate: "2017-02-05",
        contactPerson: {
          id: 7,
          name: "Billy Moyer",
          workPhone: "931-333-1234"
        },
        payType: "Salary",
        startPay: 47000,
        endpay: 52000,
        jobTitle: {
          id: 2,
          candidateId: 17,
          titleDescription: "Junior Developer"
        },
        summary: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        skills: [
          {
            id: 140,
            name: "ES6"
          },
          {
            id: 120,
            name: "JQuery"
          }
        ],
        highlights: [
          {
            id: 2,
            highlight: "Job highlight 1",
            skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
            sequence: 1,
            includeInSummary: true
          },
          {
            id: 3,
            highlight: "Job Highlight 2",
            skills: [{ id: 103, name: "Cisco" }],
            sequence: 4,
            includeInSummary: false
          }
        ]
      },
      {
        id: 7,
        candidateId: 17,
        company: {
          id: 4,
          name: "3sixD",
          description: "World famous Pick/React stack developent"
        },
        startDate: "2017-05-22",
        endDate: "2018-02-05",
        contactPerson: {
          id: 27,
          name: "Bob Skalinsky",
          workPhone: "615-333-8888"
        },
        payType: "Salary",
        startPay: 65000,
        endpay: 68000,
        jobTitle: {
          id: 1,
          candidateId: 17,
          titleDescription: "Web Developer"
        },
        summary:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sed corporis, maxime sint inventore facere veniam numquam error quisquam debitis blanditiis dolorem enim nam velit at, reiciendis veritatis, animi tempore.",
        skills: [
          {
            id: 117,
            name: "Web API"
          },
          {
            id: 120,
            name: "JQuery"
          }
        ]
      },
      {
        id: 12,
        candidateId: 17,
        company: {
          id: 7,
          name: "Web Tech"
        },
        startDate: "2018-02-10",
        contactPerson: {
          id: 20,
          name: "Sue Jenkins",
          workPhone: "615-444-9999"
        },
        payType: "Salary",
        startPay: 70000,
        endPay: "",
        jobTitle: {
          id: 1,
          candidateId: 17,
          titleDescription: "Web Developer"
        },
        summary:
          "More Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sed corporis, maxime sint inventore facere veniam numquam error quisquam debitis blanditiis dolorem enim nam velit at, reiciendis veritatis, animi tempore.",
        skills: [
          {
            id: 114,
            name: "C#"
          },
          {
            id: 115,
            name: ".Net Framework 4.0/4.5"
          }
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
    highlights: [],
    experience: []
  }
};

class CandidateCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...candidateInfo,
      tabIndex: EXPERIENCE_NDX
    };
    this.state.origForm = objCopy(this.state.formFields);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("submitted");
  };

  handleClear = () => {
    this.setState({
      ...clearFormFields,
      origForm: JSON.parse(JSON.stringify(clearFormFields.formFields))
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

  handleExperienceChange = experience => {
    this.setState(prevState => {
      return {
        formFields: {
          ...prevState.formFields,
          experience
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
          <Highlights
            highlights={this.state.formFields.highlights}
            handleHighlightChange={this.handleHighlightChange}
          />
        );
      case EXPERIENCE_NDX:
        return (
          <CandidateExperience
            formFields={this.state.formFields}
            handleExperienceChange={this.handleExperienceChange}
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
          {this.state.formFields.id === ""
            ? "Add Candidate"
            : "Update Candidate"}
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={this.handleClear}
        >
          Clear Form
        </button>
      </div>
    );
  }
}

export default CandidateCrud;
