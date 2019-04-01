import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SkillSearch from "../../SkillSearch/";

const CandidateHighlights = props => {
  const [editFlag, setEditFlag] = useState(false);
  const [showSkillsFlag, setShowSkillsFlag] = useState(false);
  const [newHighlight, setNewHightlight] = useState("");
  const [editSkillNdx, setEditSkillNdx] = useState("");
  const [dispSkillNdx, setDispSkillNdx] = useState("");
  const [skills, setSkills] = useState([
    { id: 300, name: "something" },
    { id: 301, name: "another thing" }
  ]);
  const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(false);
  const [skillDrag, setSkillDrag] = useState(false);
  const [skillSearchCoords, setSkillSearchCoords] = useState({
    right: "100px",
    top: "200px"
  });

  const passHighlightUp = tmpHighlights => {
    props.handleHighlightChange && props.handleHighlightChange(tmpHighlights);
  };

  const handleOnChange = event => {
    setNewHightlight(event.target.value);
  };

  const handleAddHighlight = () => {
    const tmp = props.formFields.highlights.slice();
    tmp.push({ id: "", highlight: newHighlight });
    setNewHightlight("");
    passHighlightUp(tmp);
  };

  const handleDelHighlight = ndx => {
    const tmp = props.formFields.highlights.slice();
    tmp.splice(ndx, 1);
    passHighlightUp(tmp);
  };

  const handleMoveHighlight = (ndx, newNdx) => {
    const tmp = props.formFields.highlights.slice();
    const tmpHighlight = tmp.splice(ndx, 1)[0];
    tmp.splice(newNdx, 0, tmpHighlight);
    // need to update sequence
    const tmpSequence = tmp[newNdx].sequence;
    tmp[newNdx].sequence = tmp[ndx].sequence;
    tmp[ndx].sequence = tmpSequence;
    passHighlightUp(tmp);
  };

  const handleEditHighlight = (ndx, event) => {
    let tmp = props.formFields.highlights.slice();
    tmp[ndx].highlight = event.target.value;
    passHighlightUp(tmp);
  };

  const handleRowClick = ndx => {
    setShowSkillsFlag(true);
    setDispSkillNdx(ndx);
    setSkills(props.formFields.highlights[ndx].skills);
    if (editSkillNdx !== ndx) setEditFlag(false);
  };

  const handleDblClick = ndx => {
    setEditSkillNdx(ndx);
    setSkills(props.formFields.highlights[ndx].skills);
    setEditFlag(true);
  };

  const handleEditSkills = ndx => {
    setEditSkillNdx(ndx);
    setDispSkillNdx("");
    setSkills(props.formFields.highlights[ndx].skills);
    setEditFlag(!editFlag);
  };

  const handleDelSkill = (ndx, event) => {
    let tmp = props.formFields.highlights.slice();
    tmp[editSkillNdx].skills.splice(ndx, 1);
    passHighlightUp(tmp);
  };

  const handleAddSkill = () => {
    // display skill search component
    setDispSkillSearchFlag(true);
  };
  const handleCloseSkillSearch = () => {
    setDispSkillSearchFlag(false);
  };

  const handleSkillSelect = skillInfo => {
    let tmp = props.formFields.highlights.slice();
    tmp[editSkillNdx].skills.push(skillInfo);
    passHighlightUp(tmp);
  };

  const handleSkillStartDrag = skillInfo => {
    setSkillDrag(skillInfo);
  };

  const handleSkillDrop = event => {
    event.preventDefault && event.preventDefault();
    skillDrag && handleSkillSelect(skillDrag);
  };

  const handleDragOver = event => {
    event.preventDefault && event.preventDefault();
    return false;
  };

  const handleDragEnd = event => {
    if (skillDrag) {
      // we are either dragging the entire skill search component
      // or just a single skill to add.  This will fire after the
      // onDrop, so if it was a skill, turn skill drag off and return
      setSkillDrag(false);
      return;
    }
    setSkillSearchCoords({ left: event.clientX, top: event.clientY });
  };

  return (
    <section
      className="candidate-highlights candidate-tab-section"
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {addHighlight()}
      {highlightList()}
      {showSkillsFlag && displaySkills()}
      {dispSkillSearchFlag && dispSkillSearch()}
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
        {props.formFields.highlights
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
                  disabled={ndx === props.formFields.highlights.length - 1}
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
                <button
                  type="button"
                  title="Edit Skills"
                  className={
                    "btn btn-secondary btn-edit" +
                    (editFlag && editSkillNdx === ndx ? " active" : "")
                  }
                  onClick={() => handleEditSkills(ndx)}
                >
                  <FontAwesomeIcon icon="edit" />
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }

  function displaySkills() {
    return (
      <div
        className="highlight-skills"
        onDragOver={handleDragOver}
        onDrop={handleSkillDrop}
      >
        {editFlag ? (
          <p>Edit mode. Click edit button again to turn off.</p>
        ) : (
          <p>Highlight Skills (hover over Highlight to view)</p>
        )}

        <div className="highlight-skills-list">
          {skills.map((skill, ndx) => (
            <span
              className={"badge badge-dark" + (editFlag ? " badge-edit" : "")}
              key={skill.id}
            >
              {skill.name}
              {editFlag && (
                <span
                  className="del-skill-badge"
                  onClick={event => handleDelSkill(ndx)}
                >
                  x
                </span>
              )}
            </span>
          ))}
          {editFlag && !dispSkillSearchFlag && (
            <button
              className="btn btn-info btn-add-skill"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          )}
        </div>
      </div>
    );
  }

  function dispSkillSearch() {
    return (
      <div className="skill-popup" draggable={true} style={skillSearchCoords}>
        <SkillSearch
          editMode="1"
          searchButton="Add Skill"
          forceRefresh={false}
          handleSkillSelect={handleSkillSelect}
          handleSkillStartDrag={handleSkillStartDrag}
          closeBtn={handleCloseSkillSearch}
        />
      </div>
    );
  }
};

export default CandidateHighlights;
