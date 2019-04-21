import React, { useState } from "react";

import SkillList from "../../Skill/SkillList";
import ListingHoc from "../../../hoc/ListingHoc";
import HighlightDetail from "./HighlightDetail";

const Highlights = props => {
  //const [editFlag, setEditFlag] = useState(false);
  const [showSkillsFlag, setShowSkillsFlag] = useState(false);
  const [newHighlight, setNewHightlight] = useState("");
  const [editSkillNdx, setEditSkillNdx] = useState("");
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
    // get the highest sequence number and add one
    const newSequence =
      tmp.reduce((low, obj) => {
        return Math.max(low, obj.sequence);
      }, -999) + 1;
    tmp.push({
      id: "",
      highlight: newHighlight,
      skills: [],
      sequence: newSequence
    });
    setNewHightlight("");
    passHighlightUp(tmp);
  };

  const handleDelHighlight = ndx => {
    const tmp = props.highlights.slice();
    tmp.splice(ndx, 1);
    passHighlightUp(tmp);
    // if the deleted highlight is the edit
    // highlight, turn off edit mode
    if (editSkillNdx === ndx) {
      setEditSkillNdx("");
      setShowSkillsFlag(false);
    }
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
    // if highlight being moved is the edit highlight,
    // update the edit ndx.
    if (editSkillNdx === ndx) setEditSkillNdx(newNdx);
  };

  const handleEditHighlight = (ndx, event) => {
    let tmp = props.highlights.slice();
    tmp[ndx].highlight = event.target.value;
    passHighlightUp(tmp);
  };

  const handleRowClick = ndx => {
    setShowSkillsFlag(true);
    setEditSkillNdx(ndx);
    setSkills(props.highlights[ndx].skills);
    //if (editSkillNdx !== ndx) setEditFlag(false);
  };

  const handleSkillsChange = newSkills => {
    let tmp = props.highlights.slice();
    tmp[editSkillNdx].skills = newSkills;
    passHighlightUp(tmp);
    setSkills(newSkills);
  };

  const handleIncludeSummary = ndx => {
    let tmp = props.highlights.slice();
    tmp[ndx].includeInSummary = !tmp[ndx].includeInSummary;
    passHighlightUp(tmp);
  };

  const actions = {
    delete: handleDelHighlight,
    move: handleMoveHighlight
  };

  const listingCallbacks = {
    handleRowClick,
    handleEditHighlight,
    handleIncludeSummary
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
    const sortHighlights = props.highlights.sort(
      (a, b) => a.sequence - b.sequence
    );
    // setup current parms for listing hoc
    const listingParms = {
      editFlag,
      editSkillNdx,
      includeSummaryButton: true
    };
    return (
      <div className="highlight-list justify-content-center">
        {ListingHoc(
          HighlightDetail,
          sortHighlights,
          actions,
          "highlight-row",
          listingCallbacks,
          listingParms
        )}
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
