import React, { Component } from "react";
import SkillSearch from "./skillSearch";
import SkillCrud from "./skillCrud";

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

    const startMode = 1;
    this.state = {
      searchMode: startMode, // used for SkillSearch so it knows what to do on dblClick
      // 1-New Skill, 2-Edit Skill, 3-Add Related Skill
      skillInfo: "",
      errMsg: "",
      forceRefresh: true, // this is just a toggle to force a Search re-render
      apiBase: window.apiUrl
    };
  }

  handleSkillSelect = skillInfo => {
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
            searchMode: 2,
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

  handleAddSkill = skillInfo => {
    // have to get nutrients from api and then load into state
    /*     const apiNutsUrl = `${this.state.apiBase}${API_NUTS}/${
      skillInfo.skillId
    }?api_key=${API_KEY}`;
    fetch(apiNutsUrl)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // for now assume that skill must exist
          let ingredInfo = {
            ingredId: result.id,
            ingredName: result.name,
            ingredDesc: result.description,
            ingredServings: 1,
            ingredNuts: result.nutrients
          };
          this.setState({
            ingred: ingredInfo
          });
        });
      })
      .catch(error => {
        console.log("Error fetching skill ingredient: ", error);
      }); */
  };

  handleChangeMode = searchMode => {
    // this is for updates to the skill screen that change the search mode
    this.setState({
      searchMode,
      forceRefresh: !this.state.forceRefresh
    });
  };

  render() {
    return (
      <main className="container-fluid fs-main d-flex p-2 bg-highlight">
        <section className="skill-setup">
          <h1>Skill Setup</h1>
          <div className="tab-section">
            <SkillCrud
              skillInfo={this.state.skillInfo}
              handleChangeMode={this.handleChangeMode}
            />
          </div>
        </section>
        <SkillSearch
          searchMode={this.state.searchMode}
          forceRefresh={this.state.forceRefresh}
          handleSkillSelect={this.handleSkillSelect}
          handleAddSkill={this.handleAddSkill}
        />
      </main>
    );
  }
}

export default SkillSetup;
