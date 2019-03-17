import React, { Component } from "react";
import TechtagSelect from "../TechtagSelect/";
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
    techtags: [],
    parentSkills: [],
    childSkills: []
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
      dragSkill: this.props.dragSkill ? this.props.dragSkill : false,
      tabIndex: TECHTAGS_NDX,
      apiBase: window.apiUrl
    };
    this.state.origForm = this.state.formFields;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.skillInfo !== prevProps.skillInfo) {
      let formFields;
      if (this.props.skillInfo) {
        formFields = this.props.skillInfo;
        this.props.handleChangeMode(this.state.tabIndex);
      } else {
        formFields = clearFormFields.formFields;
        this.props.handleChangeMode(0);
      }

      this.setState({
        formFields: { ...formFields },
        origForm: { ...formFields },
        errMsg: "",
        userMsg: ""
      });
    }

    if (
      this.props.relatedSkill &&
      (!prevProps.relatedSkill ||
        this.props.relatedSkill.id !== prevProps.relatedSkill.id)
    ) {
      switch (this.state.tabIndex) {
        case 2:
          this.handleAddRelatedSkill("parentSkills", this.props.relatedSkill);
          break;
        case 3:
          this.handleAddRelatedSkill("childSkills", this.props.relatedSkill);
          break;
        default:
        // do nothing
      }
    }

    if (this.props.dragSkill !== prevProps.dragSkill) {
      this.setState({
        dragSkill: this.props.dragSkill
      });
    }
  }

  handleTabClick = tabIndex => {
    if (tabIndex === this.state.tabIndex) return;
    // if a skill name is present, we are in edit mode
    // and need to pass the tab index to the search skills
    // component so it can be context sensitive
    const editMode = this.state.formFields.name === "" ? 0 : tabIndex;
    this.props.handleChangeMode(editMode);
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

    // check for changing edit mode by a change in the name field
    target.name === "name" &&
      this.props.handleChangeMode(value === "" ? 0 : this.state.tabIndex);

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
    this.props.handleChangeMode(0);
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

  handleAddRelatedSkill = (skillField, skillInfo) => {
    // need to check that
    // 1) a skill is not being related to itself
    // 2) a duplicate is not being added

    // check that a skill is not being related to itself
    if (skillInfo.id === this.state.formFields.id) return;

    let rSkills = this.state.formFields[skillField];
    // check for duplicate
    if (
      rSkills.some(rSkill => {
        return rSkill.id === skillInfo.id;
      })
    )
      return;

    rSkills.push(skillInfo);

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

  handleSkillDrop = (skillField, event) => {
    event.preventDefault && event.preventDefault();
    this.state.dragSkill &&
      this.handleAddRelatedSkill(skillField, this.state.dragSkill) &&
      this.setState({
        dragSkill: false
      });
  };

  render() {
    return (
      <div className="skill-container">
        <form className="basic-skill-form" onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.formFields.id} />
          <div className="basic-skill-container container-fluid d-flex flex-column justify-content-center">
            {this.skillDescSection()}
            {this.tagsAndRelatedSkillsSection()}
            {this.buttonSection()}
          </div>
          {this.state.userMsg && (
            <div className="skill-basic-confirm">{this.state.userMsg}</div>
          )}
          {this.state.errMsg && (
            <div className="skill-basic-error">{this.state.errMsg}</div>
          )}
        </form>
      </div>
    );
  }

  skillDescSection() {
    return (
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
          <label className="col-sm-3 col-form-label" htmlFor="description">
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
    );
  }

  tagsAndRelatedSkillsSection() {
    return (
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
              "tab " + (this.state.tabIndex === PSKILLS_NDX ? "active-tab" : "")
            }
            onClick={() => this.handleTabClick(PSKILLS_NDX)}
          >
            Parent Skills
          </li>
          <li
            data-tab-index={CSKILLS_NDX}
            className={
              "tab " + (this.state.tabIndex === CSKILLS_NDX ? "active-tab" : "")
            }
            onClick={() => this.handleTabClick(CSKILLS_NDX)}
          >
            Child Skills
          </li>
        </ul>
        <div className="tab-section">{this.tabSection()}</div>
      </div>
    );
  }

  tabSection() {
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
          onDrop={event => this.handleSkillDrop(skillFieldName, event)}
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

  buttonSection() {
    return (
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
    );
  }
}

export default SkillCrud;
