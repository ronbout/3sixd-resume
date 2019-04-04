import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SkillList from "../../SkillList";

const Highlights = props => {
  //const [editFlag, setEditFlag] = useState(false);
  const [showSkillsFlag, setShowSkillsFlag] = useState(false);
  const [newHighlight, setNewHightlight] = useState("");
  const [editSkillNdx, setEditSkillNdx] = useState("");
  const [dispSkillNdx, setDispSkillNdx] = useState("");
  const [skills, setSkills] = useState([
    { id: 300, name: "something" },
    { id: 301, name: "another thing" }
  ]);
  const editFlag = true;

  const passHighlightUp = tmpHighlights => {
    props.handleHighlightChange && props.handleHighlightChange(tmpHighlights);
  };

  const handleOnChange = event => {
    setNewHightlight(event.target.value);
  };

  const handleAddHighlight = () => {
    const tmp = props.highlights.slice();
    tmp.push({ id: "", highlight: newHighlight });
    setNewHightlight("");
    passHighlightUp(tmp);
  };

  const handleDelHighlight = ndx => {
    const tmp = props.highlights.slice();
    tmp.splice(ndx, 1);
    passHighlightUp(tmp);
  };

  const handleMoveHighlight = (ndx, newNdx) => {
    const tmp = props.highlights.slice();
    const tmpHighlight = tmp.splice(ndx, 1)[0];
    tmp.splice(newNdx, 0, tmpHighlight);
    // need to update sequence
    const tmpSequence = tmp[newNdx].sequence;
    tmp[newNdx].sequence = tmp[ndx].sequence;
    tmp[ndx].sequence = tmpSequence;
    passHighlightUp(tmp);
  };

  const handleEditHighlight = (ndx, event) => {
    let tmp = props.highlights.slice();
    tmp[ndx].highlight = event.target.value;
    passHighlightUp(tmp);
  };

  const handleRowClick = ndx => {
    setShowSkillsFlag(true);
    setDispSkillNdx(ndx);
    setEditSkillNdx(ndx);
    setSkills(props.highlights[ndx].skills);
    //if (editSkillNdx !== ndx) setEditFlag(false);
  };

  const handleDblClick = ndx => {
    setEditSkillNdx(ndx);
    setSkills(props.highlights[ndx].skills);
    //setEditFlag(true);
  };

  const handleSkillsChange = newSkills => {
    let tmp = props.highlights.slice();
    tmp[editSkillNdx].skills = newSkills;
    passHighlightUp(tmp);
    setSkills(newSkills);
  };

  const handleIncludeSummary = ndx => {
    console.log("toggle includeInSummary field");
  };

  return (
    <section className="candidate-highlights candidate-tab-section">
      {addHighlight()}
      {props.highlights && highlightList()}
      {showSkillsFlag && displaySkills()}
    </section>
  );

  function addHighlight() {
    return (
      <div className="add-highlight">
        <h2>Highlights</h2>
        <div className="highlight-row">
          <div />
          <div>
            <textarea
              className=""
              rows="2"
              maxLength="200"
              name="newHighlight"
              placeholder="Enter a highlight and click Add"
              value={newHighlight}
              onChange={handleOnChange}
            />
          </div>
          <div />
          <div>
            <button
              type="button"
              className="btn btn-info"
              onClick={handleAddHighlight}
              disabled={newHighlight === ""}
            >
              Add
            </button>
          </div>
          <div />
          <div />
        </div>
      </div>
    );
  }

  function highlightList() {
    return (
      <div className="highlight-list justify-content-center">
        {props.highlights
          .sort((a, b) => a.sequence - b.sequence)
          .map((item, ndx) => (
            <div key={ndx} className="highlight-row">
              <div>{ndx + 1}. </div>
              <div
                onClick={() => handleRowClick(ndx)}
                onDoubleClick={() => handleDblClick(ndx)}
              >
                <textarea
                  className={
                    (!editFlag || editSkillNdx !== ndx) && dispSkillNdx === ndx
                      ? "dark-disabled"
                      : ""
                  }
                  rows="2"
                  name={"highlight-" + ndx}
                  value={item.highlight}
                  onChange={event => handleEditHighlight(ndx, event)}
                  disabled={!editFlag || editSkillNdx !== ndx}
                />
              </div>

              <div className="">
                <button
                  type="button"
                  className="btn btn-success"
                  title="Move highlight up"
                  onClick={() => handleMoveHighlight(ndx, ndx - 1)}
                  disabled={ndx === 0}
                >
                  <FontAwesomeIcon icon="arrow-up" />
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-success"
                  title="Move highlight Down"
                  onClick={() => handleMoveHighlight(ndx, ndx + 1)}
                  disabled={ndx === props.highlights.length - 1}
                >
                  <FontAwesomeIcon icon="arrow-down" />
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-danger"
                  title="Delete Highlight"
                  onClick={() => handleDelHighlight(ndx)}
                >
                  X
                </button>
              </div>
              <div className="">
                {props.includeSummaryButton && (
                  <button
                    type="button"
                    title="Edit Skills"
                    className={
                      "btn btn-secondary btn-edit" +
                      (editFlag && editSkillNdx === ndx ? " active" : "")
                    }
                    onClick={() => handleIncludeSummary(ndx)}
                  >
                    <FontAwesomeIcon icon="edit" />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  }

  function displaySkills() {
    return (
      <div className="skill-edit-list">
        <SkillList
          skills={skills}
          editFlag={editFlag}
          handleSkillsChange={handleSkillsChange}
        />
      </div>
    );
  }
};

export default Highlights;
