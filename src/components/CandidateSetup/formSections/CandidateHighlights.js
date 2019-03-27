import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CandidateHighlights = props => {
  const [editSkillFlag, setEditSkillFlag] = useState(false);
  const [newHighlight, setNewHightlight] = useState("");
  const [skillNdx, setSkillNdx] = useState("");
  const [skills, setSkills] = useState([
    { id: 300, name: "something" },
    { id: 301, name: "another thing" }
  ]);

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
    passHighlightUp(tmp);
  };

  const handleEditHighlight = (ndx, event) => {
    let tmp = props.formFields.highlights.slice();
    tmp[ndx].highlight = event.target.value;
    passHighlightUp(tmp);
  };

  const handleEditSkills = ndx => {
    if (!editSkillFlag) {
      setSkillNdx(ndx);
      setSkills(props.formFields.highlights[ndx].skills);
    }
    setEditSkillFlag(!editSkillFlag);
  };

  const handleDelSkill = (ndx, event) => {
    let tmp = props.formFields.highlights.slice();
    console.log(tmp);
    tmp[skillNdx].skills.splice(ndx, 1);
    console.log(tmp);
    passHighlightUp(tmp);
  };

  const handleMouseEnter = ndx => {
    if (editSkillFlag) return;
    setSkills(props.formFields.highlights[ndx].skills);
  };

  const handleMouseLeave = () => {
    if (editSkillFlag) return;
    setSkills([
      { id: 300, name: "something" },
      { id: 301, name: "another thing" }
    ]);
  };

  return (
    <section className="candidate-highlights candidate-tab-section">
      {addHighlight()}
      {highlightList()}
      {displaySkills()}
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
          <div />
        </div>
      </div>
    );
  }

  function highlightList() {
    return (
      <div className="highlight-list justify-content-center">
        {props.formFields.highlights.map((item, ndx) => (
          <div
            key={ndx}
            className="highlight-row"
            onMouseEnter={() => handleMouseEnter(ndx)}
            onMouseLeave={handleMouseLeave}
          >
            <div>{ndx + 1}. </div>
            <div>
              <textarea
                className=""
                rows="2"
                name={"highlight-" + ndx}
                value={item.highlight}
                onChange={event => handleEditHighlight(ndx, event)}
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
                  (editSkillFlag && skillNdx === ndx ? " active" : "")
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
      <div className="highlight-skills">
        {editSkillFlag ? (
          <p>Edit mode. Click edit button again to turn off.</p>
        ) : (
          <p>Highlight Skills (hover over Highlight to view)</p>
        )}

        <div className="highlight-skills-list">
          {skills.map((skill, ndx) => (
            <span
              className={
                "badge badge-dark" + (editSkillFlag ? " badge-edit" : "")
              }
              key={skill.id}
            >
              {skill.name}
              {editSkillFlag && (
                <span
                  className="del-skill-badge"
                  onClick={event => handleDelSkill(ndx)}
                >
                  x
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
};

export default CandidateHighlights;
