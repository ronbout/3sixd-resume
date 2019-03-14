import React, { Component } from "react";
import TechtagSelect from "./techtagSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_SKILL = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";
const TECHTAGS_NDX = 1;
const PSKILLS_NDX = 2;
const CSKILLS_NDX = 3;

const clearFormFields = {
  formFields: {
    id: "",
    name: "",
    description: "",
    url: "",
    techtags: []
  }
};

class SkillCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...clearFormFields,
      errMsg: "",
      userMsg: "",
      dragTag: false,
      tabIndex: TECHTAGS_NDX,
      apiBase: window.apiUrl
    };
    this.state.origForm = this.state.formFields;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.skillInfo !== prevProps.skillInfo) {
      let formFields = this.props.skillInfo
        ? this.props.skillInfo
        : clearFormFields;

      this.setState({
        formFields: { ...formFields },
        origForm: { ...formFields },
        errMsg: "",
        userMsg: ""
      });
    }
  }

  handleTabClick = tabIndex => {
    if (tabIndex === this.state.tabIndex) return;
    this.setState({
      tabIndex
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // clear out any error msg
    this.setState({ errMsg: "", userMsg: "" });

    let body = {
      ...this.state.formFields
    };
    // need to know if this is a new skill or update
    // (post vs put)
    const id = this.state.formFields.id;
    const httpMethod = id ? "put" : "post";
    const basicUrl =
      (id
        ? `${this.state.apiBase}${API_SKILL}/${id}`
        : `${this.state.apiBase}${API_SKILL}`) + API_QUERY;
    let httpConfig = {
      method: httpMethod,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(basicUrl, httpConfig)
      .then(response => {
        response.json().then(result => {
          // figure out what to do here
          if (result.error) {
            this.setState({
              errMsg:
                result.errorCode === 45001
                  ? `Skill ${this.state.formFields.name} already exists.`
                  : "An unknown error has occurred"
            });
          } else {
            result = result.data;
            // success.  let user know and clear out form
            const skillName = this.state.formFields.name;
            this.handleClear();
            this.setState({
              userMsg: `Skill "${skillName}" has been ${
                httpMethod === "post" ? "created." : "updated."
              }`
            });
            this.props.handleChangeMode(1);
          }
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
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

  handleDelTechtag = (ndx, event) => {
    let techtags = this.state.formFields.techtags;
    techtags.splice(ndx, 1);

    this.setState({
      formFields: { ...this.state.formFields }
    });
  };

  handleDelRelatedSkill = (skillFieldName, ndx, event) => {
    let rSkills = this.state.formFields[skillFieldName];
    rSkills.splice(ndx, 1);

    this.setState({
      formFields: { ...this.state.formFields }
    });
  };

  handleClear = () => {
    this.setState({
      ...clearFormFields,
      errMsg: "",
      userMsg: "",
      origForm: clearFormFields.formFields
    });
  };

  handleAddTag = tagInfo => {
    let techtags = this.state.formFields.techtags;
    techtags.push(tagInfo);

    this.setState({
      formFields: { ...this.state.formFields }
    });
    return true;
  };

  handleTagStartDrag = tagInfo => {
    this.setState({
      dragTag: tagInfo
    });
  };

  handleDragOver = event => {
    event.preventDefault && event.preventDefault();
    return false;
  };

  handleTagDrop = event => {
    event.preventDefault && event.preventDefault();
    this.state.dragTag &&
      this.handleAddTag(this.state.dragTag) &&
      this.setState({
        dragTag: false
      });
  };

  render() {
    return (
      <div className="skill-container">
        <form className="basic-skill-form" onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.formFields.id} />
          <div className="basic-skill-container container-fluid d-flex flex-column justify-content-center">
            <div className="skill-desc-form-section">
              <h2>Skill View/Entry</h2>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="name">
                  Skill Name: *
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={this.state.formFields.name}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <p>( * - required field )</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="description"
                >
                  Description:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={this.state.formFields.description}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="url">
                  URL:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="url"
                    id="url"
                    value={this.state.formFields.url}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            {
              // Separate Tags and Related Skills Section
            }
            <div className="related-skill-section">
              <ul className="tab-list">
                <li
                  data-tab-index={TECHTAGS_NDX}
                  className={
                    "tab " +
                    (this.state.tabIndex === TECHTAGS_NDX ? "active-tab" : "")
                  }
                  onClick={() => this.handleTabClick(TECHTAGS_NDX)}
                >
                  Techtags
                </li>
                <li
                  data-tab-index={PSKILLS_NDX}
                  className={
                    "tab " +
                    (this.state.tabIndex === PSKILLS_NDX ? "active-tab" : "")
                  }
                  onClick={() => this.handleTabClick(PSKILLS_NDX)}
                >
                  Parent Skills
                </li>
                <li
                  data-tab-index={CSKILLS_NDX}
                  className={
                    "tab " +
                    (this.state.tabIndex === CSKILLS_NDX ? "active-tab" : "")
                  }
                  onClick={() => this.handleTabClick(CSKILLS_NDX)}
                >
                  Child Skills
                </li>
              </ul>
              <div className="tab-section">{this.tagSection()}</div>
            </div>
            {
              // Button Section
            }
            <div className="fs-btn-container" style={{ textAlign: "center" }}>
              <button
                className="btn btn-primary"
                disabled={this.state.formFields.name === ""}
              >
                {this.state.formFields.id === "" ? "Add skill" : "Update skill"}
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleClear}
              >
                Clear Skill
              </button>
            </div>
          </div>
          {this.state.userMsg && (
            <div className="skill-basic-confirm">{this.state.userMsg}</div>
          )}
          {this.state.errMsg && (
            <div className="skill-basic-error">{this.state.errMsg}</div>
          )}
          <div
            className="modal fade"
            id="notesModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="notesModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="notesModalLabel">
                    Notes{" "}
                    {this.state.formFields.name !== "" &&
                      "for " + this.state.formFields.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body notes-modal">
                  <label>
                    <textarea
                      cols="45"
                      rows="10"
                      name="notes"
                      id="notes"
                      placeholder="Enter useful information about the skill such as preparation tips"
                      value={this.state.formFields.notes}
                      onChange={this.handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  tagSection() {
    switch (this.state.tabIndex) {
      case TECHTAGS_NDX:
        return this.techTagSection();
      case PSKILLS_NDX:
        return this.parentSkillSection();
      case CSKILLS_NDX:
        return this.childSkillSection();
      default:
        return null;
    }
  }

  techTagSection() {
    return (
      <section className="skill-techtags-form-section skill-related-section">
        <div
          className="techtag-list related-list"
          onDragOver={this.handleDragOver}
          onDrop={this.handleTagDrop}
        >
          <h2>Tech Tag List</h2>
          {this.state.formFields.name !== "" && (
            <div className="row">
              <div className="col-sm-4">Techtag Name</div>
              <div className="col-sm-5">Description</div>
              <div className="col-sm-1">Delete</div>
            </div>
          )}
          {this.state.formFields.name !== "" &&
            // loop through the state techtags array
            // to load the techtags
            this.state.formFields.techtags.map((techtag, ndx) => (
              <div key={techtag.id} className="row techtag-row related-row">
                <input
                  className="col-sm-4"
                  type="text"
                  name={"techtag" + ndx}
                  value={techtag.name}
                  disabled
                />
                <input
                  className="col-sm-5"
                  type="text"
                  name={"techtagDesc" + ndx}
                  value={techtag.description}
                  disabled
                />
                <button
                  type="button"
                  className="col-sm-1 btn btn-danger"
                  onClick={event => this.handleDelTechtag(ndx, event)}
                >
                  X
                </button>
              </div>
            ))}
          {this.state.formFields.name !== "" && (
            <p>Drag and Drop from Tag List</p>
          )}
        </div>

        {this.state.formFields.name && (
          <TechtagSelect
            skillTagsList={this.state.formFields.techtags}
            handleAddTag={this.handleAddTag}
            handleTagStartDrag={this.handleTagStartDrag}
          />
        )}
      </section>
    );
  }

  parentSkillSection() {
    return this.relatedSkillSection("parentSkills", "Parent Skills");
  }

  childSkillSection() {
    return this.relatedSkillSection("childSkills", "Child Skills");
  }

  relatedSkillSection(skillFieldName, dispName) {
    return (
      <section className="skill-related-section">
        <div
          className="related-list"
          onDragOver={this.handleDragOver}
          onDrop={this.handleTagDrop}
        >
          <h2>{dispName} List</h2>
          {this.state.formFields.name !== "" && (
            <div className="row">
              <div className="col-sm-4">Skill Name</div>
              <div className="col-sm-5">Description</div>
              <div className="col-sm-1">Delete</div>
            </div>
          )}
          {this.state.formFields.name !== "" &&
            // loop through the related skill array
            this.state.formFields[skillFieldName].map((skill, ndx) => (
              <div key={skill.id} className="row related-row">
                <input
                  className="col-sm-4"
                  type="text"
                  name={"skill" + ndx}
                  value={skill.name}
                  disabled
                />
                <input
                  className="col-sm-5"
                  type="text"
                  name={"skillDesc" + ndx}
                  value={skill.description}
                  disabled
                />
                <button
                  type="button"
                  className="col-sm-1 btn btn-danger"
                  onClick={event =>
                    this.handleDelRelatedSkill(skillFieldName, ndx, event)
                  }
                >
                  X
                </button>
              </div>
            ))}
          {this.state.formFields.name !== "" && (
            <p>Drag and Drop from Skill Search List</p>
          )}
        </div>
      </section>
    );
  }
}

export default SkillCrud;
