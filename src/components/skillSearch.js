import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_SKILL_SEARCH = "skills/search/";
const API_SKILLS = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

const clearFormFields = {
  formFields: {
    keyword: "",
    skillSelect: 0
  }
};

class SkillSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields,
      errMsg: "",
      userMsg: "",
      apiBase: window.apiUrl
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState) {
    // auto refresh the search list
    // if forceRefresh, it is coming in from parent and needs
    // to wait for database update, hence the setTimeout
    if (this.props.forceRefresh !== prevProps.forceRefresh) {
      setTimeout(this.handleSearch, 800);
    }
  }

  handleSearch = event => {
    event && event.preventDefault();
    let skillApi =
      this.state.formFields.keyword !== ""
        ? API_SKILL_SEARCH + this.state.formFields.keyword
        : API_SKILLS;

    const apiUrl = `${this.state.apiBase}${skillApi}${API_QUERY}`;
    fetch(apiUrl)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // need to convert nulls to "" for react forms
          result &&
            result.forEach(obj => {
              Object.keys(obj).forEach(val => {
                obj[val] = obj[val] ? obj[val] : "";
              });
            });
          this.setState({
            skillOptions: result ? result : []
          });
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

  handleSelect = () => {
    const selectSkillInfo = this.state.skillOptions[
      this.state.formFields.skillSelect
    ];
    // if a prop was passed down to handle the skill select, call it
    this.props.handleSkillSelect &&
      this.props.handleSkillSelect(selectSkillInfo);
  };

  handleSkillClick = (ndx, event) => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        skillSelect: ndx
      }
    });
  };

  handleDragStart = (skillInfo, ndx, event) => {
    this.handleSkillClick(ndx, event);
    this.props.handleSkillStartDrag(skillInfo);
  };

  convertHtmlToText = value => {
    let d = document.createElement("div");
    d.innerHTML = value;
    d.id = "tmp-div";
    let retVal = d.innerText;
    document.body.appendChild(d);
    let tmp = document.getElementById("tmp-div");
    tmp.parentNode.removeChild(tmp);
    return retVal;
  };

  render() {
    return (
      <section className="skill-search p-3">
        <h1>Skill Search</h1>

        {this.state.userMsg && (
          <div className="skill-search-msg">{this.state.userMsg}</div>
        )}
        {this.state.errMsg && (
          <div className="skill-search-error">{this.state.errMsg}</div>
        )}

        <form className="skill-search-form" onSubmit={this.handleSearch}>
          {/* keyword entry */}
          <div className="form-group">
            <label htmlFor="keyword">
              <strong>Search Skills</strong>
            </label>
            <div id="skill-search-row" className="row mx-0">
              <input
                type="text"
                className="form-control"
                name="keyword"
                id="keyword"
                value={this.state.formFields.keyword}
                onChange={this.handleInputChange}
              />
              <button className="btn btn-search mx-1">
                <FontAwesomeIcon icon="search" />
              </button>
            </div>
          </div>
          {/* skill List returned from search api */}
          <div className="div-select-container" style={{ maxHeight: "300px" }}>
            {this.state.skillOptions &&
              this.state.skillOptions.map((skillInfo, ndx) => {
                return (
                  <div
                    className={
                      "div-select" +
                      (this.state.formFields.skillSelect === ndx
                        ? " selected"
                        : "")
                    }
                    key={ndx}
                    data-value={ndx}
                    draggable={true}
                    onDragStart={() => this.handleDragStart(skillInfo, ndx)}
                    onClick={() => this.handleSkillClick(ndx)}
                    onDoubleClick={this.handleSelect}
                    title={
                      (skillInfo.description
                        ? skillInfo.description
                        : "No description available ") +
                      this.convertHtmlToText("&#013;&#010;") +
                      (skillInfo.url ? "URL: " + skillInfo.url : "")
                    }
                  >
                    {skillInfo.name}
                  </div>
                );
              })}
          </div>
          <p>Hover over skill for more details</p>
          {/* Select and Refresh buttons 
							 Select sends skill up to parent component
							 Refresh submits form to get new skill list
						*/}
          <div
            className="search-skills-buttons mt-3"
            style={{ textAlign: "center" }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSelect}
              disabled={
                !(
                  this.state.skillOptions && this.state.skillOptions.length > 0
                ) || this.props.editMode === 1
              }
            >
              {this.props.searchButton}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default SkillSearch;
