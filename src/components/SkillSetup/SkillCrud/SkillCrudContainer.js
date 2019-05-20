import React, { Component } from "react";

import SkillCrud from "./SkillCrud";

const API_SKILL = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";
const TECHTAGS_NDX = 0;
const PSKILLS_NDX = 1;
const CSKILLS_NDX = 2;

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

class SkillCrudContainer extends Component {
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
        this.props.handleChangeMode(this.state.tabIndex + 1);
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
        case PSKILLS_NDX:
          this.handleAddRelatedSkill("parentSkills", this.props.relatedSkill);
          break;
        case CSKILLS_NDX:
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
    const editMode = this.state.formFields.name === "" ? 0 : tabIndex + 1;
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
      this.props.handleChangeMode(value === "" ? 0 : this.state.tabIndex + 1);

    let errs = {};
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: value
      },
      ...errs
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
      <SkillCrud
        state={this.state}
        handleTabClick={this.handleTabClick}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        handleDelRelatedSkill={this.handleDelRelatedSkill}
        handleClear={this.handleClear}
        handleAddTag={this.handleAddTag}
        handleAddRelatedSkill={this.handleAddRelatedSkill}
        handleTagStartDrag={this.handleTagStartDrag}
        handleDragOver={this.handleDragOver}
        handleTagDrop={this.handleTagDrop}
        handleSkillDrop={this.handleSkillDrop}
        {...this.props}
      />
    );
  }
}

export default SkillCrudContainer;
