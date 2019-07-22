import React, { useState } from "react";

import HighlightsForm from "./HighlightsForm";

const HighlightsContainer = props => {
  //const [editFlag, setEditFlag] = useState(false);
  const [showSkillsFlag, setShowSkillsFlag] = useState(false);
  const [newHighlight, setNewHightlight] = useState("");
  const [editSkillNdx, setEditSkillNdx] = useState("");
  const [skills, setSkills] = useState([]);
  const editFlag = true;

  const passHighlightUp = tmpHighlights => {
    console.log("pass highlight up: ", tmpHighlights);
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
    const tmp = props.highlights.slice();
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
    <HighlightsForm
      actions={actions}
      highlights={props.highlights}
      showSkillsFlag={showSkillsFlag}
      newHighlight={newHighlight}
      editFlag={editFlag}
      editSkillNdx={editSkillNdx}
      includeInSummary={props.includeInSummary}
      heading={props.heading}
      listingCallbacks={listingCallbacks}
      skills={skills}
      handleOnChange={handleOnChange}
      handleAddHighlight={handleAddHighlight}
      handleSkillsChange={handleSkillsChange}
      candId={props.candId}
    />
  );
};

export default HighlightsContainer;
