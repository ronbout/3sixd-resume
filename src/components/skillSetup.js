import React, { Component } from "react";
import SkillSearch from "./skillSearch";
import SkillCrud from "./skillCrud";

const API_BASE = "http://localhost/api/";
const API_NOTEFAVS = "skills/notefav";
const API_FAVS = "skills/fav";
const API_RECIPE = "skills/recipe";
const API_NUTS = "skills/nutrients";
const API_KEY = "6y9fgv43dl40f9wl";

class SkillSetup extends Component {
  constructor(props) {
    super(props);

    const startMode = 1;
    this.state = {
      searchMode: startMode, // used for SkillSearch so it knows what to do on dblClick
      // 1-New Skill, 2-Edit Skill, 3-Add Related Skill
      skillInfo: "",
      errMsg: "",
      forceRefresh: true // this is just a toggle to force a Search re-render
    };
  }

  handleSkillSelect = skillInfo => {
    this.setState({
      searchMode: 2,
      skillInfo: skillInfo
    });
    // need to fetch related info
    /*       const apiRecipeUrl = `${API_BASE}${API_RECIPE}/${
        skillInfo.skillId
      }?api_key=${API_KEY}`;
      fetch(apiRecipeUrl)
        .then(response => {
          response.json().then(result => {
            // for now assume that skill must exist as
            // it came directly from the search api
            // and no skills are deleted
            // eventually add code...just in case
            let recipeInfo = { ...result.data, skillType: "skill Recipe" };
            // check owner against user and change set searchMode accordingly
            const searchMode =
              recipeInfo.ownerId === this.props.user.memberId ? 4 : 5;
            this.setState({
              tabIndex: 2,
              searchMode,
              skillInfo: {
                ...recipeInfo
              },
              ingred: ""
            });
            // send off the fav/notes api
            this.getFavNoteInfo(recipeInfo);
          });
        })
        .catch(error => {
          console.log("Error fetching skill recipe: ", error);
        }); */
  };

  handleAddSkill = skillInfo => {
    // have to get nutrients from api and then load into state
    /*     const apiNutsUrl = `${API_BASE}${API_NUTS}/${
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
    // this is for updates to the recipe screen that change the search mode
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
