import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./css/skillSearch.css";

const API_SKILL_SEARCH = "skills/search/";
const API_SKILLS = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";
const API_TAGS = "techtags";
const API_TAG_SKILLS = "techtag_skills/";

const clearFormFields = {
  formFields: {
    keyword: "",
    skillSelect: 0,
    tagSelect: -1
  }
};

class SkillSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields,
      errMsg: "",
      userMsg: "",
      apiBase: window.apiUrl,
      tagOptions: [],
      openTagOptions: false,
      loading: true,
      closeBtn: this.props.closeBtn || false
    };
  }

  componentDidMount() {
    this.loadTechtags();
    this.handleSearch();
  }

  loadTechtags() {
    const apiUrl = `${this.state.apiBase}${API_TAGS}${API_QUERY}`;
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
            tagOptions: result ? result : []
          });
        });
      })
      .catch(error => {
        console.log("Techtag Fetch error: ", error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // auto refresh the search list
    // if forceRefresh, it is coming in from parent and needs
    // to wait for database update, hence the setTimeout
    if (
      this.props.forceRefresh &&
      this.props.forceRefresh !== prevProps.forceRefresh
    ) {
      setTimeout(this.handleSearch, 800);
    }
  }

  handleSearch = event => {
    event && event.preventDefault();
    this.setState({
      loading: true
    });
    let apiQuery = API_QUERY;
    let skillApi;
    // 3 api possibilities: 1) no keyword, no techtag
    // 2) keyword, no techtag or keyword, techtag
    // 3) no keyword, techtag
    if (this.state.formFields.keyword) {
      // skills search api
      skillApi = API_SKILL_SEARCH + this.state.formFields.keyword;
      if (this.state.formFields.tagSelect > -1) {
        // add techtag to search url
        const techtagId = this.state.tagOptions[this.state.formFields.tagSelect]
          .id;
        apiQuery += "&techtag=" + techtagId;
      }
    } else if (this.state.formFields.tagSelect === -1) {
      // standard skills api
      skillApi = API_SKILLS;
    } else {
      // USE techtag_skills api
      const techtagId = this.state.tagOptions[this.state.formFields.tagSelect]
        .id;
      skillApi = API_TAG_SKILLS + techtagId;
    }

    const apiUrl = `${this.state.apiBase}${skillApi}${apiQuery}`;
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
            skillOptions: result ? result : [],
            loading: false
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

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      this.handleSearch();
    }
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

  handleTagSelect = (ndx, event) => {
    if (this.state.formFields.tagSelect !== ndx) {
      this.setState(
        {
          formFields: {
            ...this.state.formFields,
            tagSelect: ndx
          }
        },
        this.handleSearch
      );
    }
    this.handleTagSelectFocus();
  };

  handleDragStart = (skillInfo, ndx, event) => {
    const skillTxt = JSON.stringify(skillInfo);
    event.dataTransfer.setData("text/plain", skillTxt);
    this.handleSkillClick(ndx, event);
    this.props.handleSkillStartDrag(skillInfo);
    event.stopPropagation();
  };

  handleTagSelectFocus = () => {
    this.setState(prevState => {
      return { openTagOptions: !prevState.openTagOptions };
    });
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

        <div className="skill-search-form">
          {/* techtag <select> for filter */}

          <div className="form-group">{this.displayTechtagSelect()}</div>

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
                onKeyPress={this.handleKeyPress}
              />
              <button
                type="button"
                className="btn btn-dark btn-search mx-1"
                onClick={this.handleSearch}
              >
                <FontAwesomeIcon icon="search" />
              </button>
            </div>
          </div>
          {/* skill List returned from search api */}
          <div
            className="div-select-container"
            style={{ maxHeight: "300px", minHeight: "300px" }}
          >
            {this.state.skillOptions && !this.state.loading ? (
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
                    onDragStart={event =>
                      this.handleDragStart(skillInfo, ndx, event)
                    }
                    onDragEnd={event => event.stopPropagation()}
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
              })
            ) : (
              <p>Loading....</p>
            )}
          </div>
          <p>Hover over skill for more details</p>
          {/* Select and, if prop, Close Buttons */}
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
            {this.state.closeBtn && (
              <button
                type="button"
                className="btn btn-warning"
                onClick={this.state.closeBtn}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  displayTechtagSelect() {
    const tagList = this.state.tagOptions ? this.state.tagOptions : [];
    const optionHeight = 23;
    const OptionRows = Math.min(10, tagList.length);
    let divHeight = this.state.openTagOptions
      ? optionHeight * OptionRows + 6
      : 30;
    return (
      <div className="div-select-container" style={{ height: divHeight }}>
        {(this.state.formFields.tagSelect === -1 ||
          this.state.openTagOptions) && (
          <div
            className="div-select d-flex justify-content-between tag-option"
            key={-1}
            data-value="-1"
            onClick={() => this.handleTagSelect(-1)}
            value="-1"
          >
            <div>Select Techtag to Filter Skills</div>

            <div>
              <FontAwesomeIcon icon="chevron-down" /> &nbsp;
            </div>
          </div>
        )}
        {this.state.tagOptions ? (
          this.state.tagOptions.map((tagInfo, ndx) => {
            return (
              (this.state.openTagOptions ||
                this.state.formFields.tagSelect === ndx) && (
                <div
                  className={
                    "div-select d-flex justify-content-between tag-option" +
                    (this.state.formFields.tagSelect === ndx ? " selected" : "")
                  }
                  key={ndx}
                  data-value={ndx}
                  onClick={() => this.handleTagSelect(ndx)}
                  title={tagInfo.description}
                >
                  <div>{tagInfo.name}</div>
                  <div>
                    {this.state.formFields.tagSelect === ndx &&
                      !this.state.openTagOptions && (
                        <FontAwesomeIcon icon="chevron-down" />
                      )}
                    &nbsp;
                  </div>
                </div>
              )
            );
          })
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}

export default SkillSearch;
