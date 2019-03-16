import React, { Component } from "react";
import SkillSearch from "../SkillSearch/";
import SkillCrud from "../SkillCrud/";

import "./skillSetup.css";

const API_SKILLS = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

function convertNullsToEmpty(obj) {
  obj.forEach(obj => {
    Object.keys(obj).forEach(val => {
      obj[val] = obj[val] ? obj[val] : "";
    });
  });
}

class SkillSetup extends Component {
  constructor(props) {
    super(props);

    const startMode = 0;
    this.state = {
      editMode: startMode, // used for SkillSearch so it knows what to do on dblClick
      // 0-Empty Skill, 1-Edit Techtags, 2-Parent Skills, 3-Child Skills
      skillInfo: "",
      relatedSkill: "",
      errMsg: "",
      dragSkill: false,
      forceRefresh: true, // this is just a toggle to force a Search re-render
      searchButton: this.getSearchButtonText(startMode),
      apiBase: window.apiUrl
    };
  }

  handleSkillSelect = skillInfo => {
    switch (this.state.editMode) {
      case 0:
        this.loadSkill(skillInfo);
        break;
      case 1:
        break;
      default:
        this.setState({
          relatedSkill: skillInfo
        });
    }
  };

  loadSkill = skillInfo => {
    // need to fetch related info
    const apiTechtagsUrl = `${this.state.apiBase}${API_SKILLS}/${
      skillInfo.id
    }${API_QUERY}`;
    fetch(apiTechtagsUrl)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // need to convert nulls to "" for react forms
          result && convertNullsToEmpty(result.techtags);
          result && convertNullsToEmpty(result.parentSkills);
          result && convertNullsToEmpty(result.childSkills);
          this.setState({
            skillInfo: {
              ...skillInfo,
              techtags: result ? (result.techtags ? result.techtags : []) : [],
              parentSkills: result
                ? result.parentSkills
                  ? result.parentSkills
                  : []
                : [],
              childSkills: result
                ? result.childSkills
                  ? result.childSkills
                  : []
                : []
            }
          });
        });
      })
      .catch(error => {
        console.log("Error fetching skill techtags: ", error);
      });
  };

  handleChangeMode = editMode => {
    // this is for updates to the skill screen that change the search mode
    const skillInfo = editMode === 0 ? "" : this.state.skillInfo;
    const searchButton = this.getSearchButtonText(editMode);
    this.setState({
      skillInfo,
      relatedSkill: "",
      searchButton,
      editMode,
      forceRefresh: !this.state.forceRefresh
    });
  };

  getSearchButtonText = editMode => {
    switch (editMode) {
      case 2:
        return "Add Parent Skill";
      case 3:
        return "Add Child Skill";
      default:
        return "Edit Skill";
    }
  };

  handleSkillStartDrag = skillInfo => {
    this.setState({
      dragSkill: skillInfo
    });
  };

  render() {
    return (
      <main className="container-fluid fs-main d-flex p-2 bg-highlight">
        <section className="skill-setup">
          <div className="tab-section">
            <SkillCrud
              skillInfo={this.state.skillInfo}
              relatedSkill={this.state.relatedSkill}
              handleChangeMode={this.handleChangeMode}
              dragSkill={this.state.dragSkill}
            />
          </div>
        </section>
        <SkillSearch
          editMode={this.state.editMode}
          searchButton={this.state.searchButton}
          forceRefresh={this.state.forceRefresh}
          handleSkillSelect={this.handleSkillSelect}
          handleSkillStartDrag={this.handleSkillStartDrag}
        />
      </main>
    );
  }
}

export default SkillSetup;
