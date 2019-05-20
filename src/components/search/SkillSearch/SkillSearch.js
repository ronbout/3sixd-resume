import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./css/skillSearch.css";

const SkillSearch = props => {
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      props.handleSearch();
    }
  };

  const convertHtmlToText = value => {
    let d = document.createElement("div");
    d.innerHTML = value;
    d.id = "tmp-div";
    let retVal = d.innerText;
    document.body.appendChild(d);
    let tmp = document.getElementById("tmp-div");
    tmp.parentNode.removeChild(tmp);
    return retVal;
  };

  const displayTechtagSelect = () => {
    const tagList = props.state.tagOptions ? props.state.tagOptions : [];
    const optionHeight = 23;
    const OptionRows = Math.min(10, tagList.length);
    let divHeight = props.state.openTagOptions
      ? optionHeight * OptionRows + 6
      : 30;
    return (
      <div className="div-select-container" style={{ height: divHeight }}>
        {(props.state.formFields.tagSelect === -1 ||
          props.state.openTagOptions) && (
          <div
            className="div-select d-flex justify-content-between tag-option"
            key={-1}
            data-value="-1"
            onClick={() => props.handleTagSelect(-1)}
            value="-1"
          >
            <div>Select Techtag to Filter Skills</div>

            <div>
              <FontAwesomeIcon icon="chevron-down" /> &nbsp;
            </div>
          </div>
        )}
        {props.state.tagOptions ? (
          props.state.tagOptions.map((tagInfo, ndx) => {
            return (
              (props.state.openTagOptions ||
                props.state.formFields.tagSelect === ndx) && (
                <div
                  className={
                    "div-select d-flex justify-content-between tag-option" +
                    (props.state.formFields.tagSelect === ndx
                      ? " selected"
                      : "")
                  }
                  key={ndx}
                  data-value={ndx}
                  onClick={() => props.handleTagSelect(ndx)}
                  title={tagInfo.description}
                >
                  <div>{tagInfo.name}</div>
                  <div>
                    {props.state.formFields.tagSelect === ndx &&
                      !props.state.openTagOptions && (
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
  };

  return (
    <section className="skill-search p-3">
      <h1>Skill Search</h1>

      {props.state.userMsg && (
        <div className="skill-search-msg">{props.state.userMsg}</div>
      )}
      {props.state.errMsg && (
        <div className="skill-search-error">{props.state.errMsg}</div>
      )}

      <div className="skill-search-form">
        {/* techtag <select> for filter */}

        <div className="form-group">{displayTechtagSelect()}</div>

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
              value={props.state.formFields.keyword}
              onChange={props.handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              className="btn btn-dark btn-search mx-1"
              onClick={props.handleSearch}
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
          {props.state.skillOptions && !props.state.loading ? (
            props.state.skillOptions.map((skillInfo, ndx) => {
              return (
                <div
                  className={
                    "div-select" +
                    (props.state.formFields.skillSelect === ndx
                      ? " selected"
                      : "")
                  }
                  key={ndx}
                  data-value={ndx}
                  draggable={true}
                  onDragStart={event =>
                    props.handleDragStart(skillInfo, ndx, event)
                  }
                  onDragEnd={event => event.stopPropagation()}
                  onClick={() => props.handleSkillClick(ndx)}
                  onDoubleClick={props.handleSelect}
                  title={
                    (skillInfo.description
                      ? skillInfo.description
                      : "No description available ") +
                    convertHtmlToText("&#013;&#010;") +
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
            onClick={props.handleSelect}
            disabled={
              !(
                props.state.skillOptions && props.state.skillOptions.length > 0
              ) || props.editMode === 1
            }
          >
            {props.searchButton}
          </button>
          {props.state.closeBtn && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={props.state.closeBtn}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillSearch;
