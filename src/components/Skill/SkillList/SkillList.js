import React, { useState } from "react";

import SkillSearch from "../SkillSearch/";

import "./css/skillList.css";

const SkillList = props => {
  const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(false);
  const [skillDrag, setSkillDrag] = useState(false);
  const [skillSearchCoords, setSkillSearchCoords] = useState({
    right: "50px",
    top: "100px"
  });
  const [shiftXY, setShiftXY] = useState({});

  const handleOpenSkillSearch = () => {
    setDispSkillSearchFlag(true);
  };

  const handleAddSkill = skillInfo => {
    // check for duplicate
    if (
      props.skills.some(skill => {
        return skill.id === skillInfo.id;
      })
    )
      return;
    let tmpSkills = props.skills.slice();
    tmpSkills.push(skillInfo);
    props.handleSkillsChange(tmpSkills);
  };

  const handleDelSkill = ndx => {
    let tmpSkills = props.skills.slice();
    tmpSkills.splice(ndx, 1);
    props.handleSkillsChange(tmpSkills);
  };

  const handleCloseSkillSearch = () => {
    setDispSkillSearchFlag(false);
  };

  const handleSkillStartDrag = skillInfo => {
    setSkillDrag(skillInfo);
  };

  const handleSkillDrop = event => {
    event.preventDefault && event.preventDefault();
    skillDrag && handleAddSkill(skillDrag);
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
    setSkillSearchCoords({
      left: event.clientX - shiftXY.left,
      top: event.clientY - shiftXY.top
    });
  };

  const handleDragStart = event => {
    // have to figure out offset from where the mouse is in the div
    let shiftX = event.clientX - event.target.getBoundingClientRect().left;
    let shiftY = event.clientY - event.target.getBoundingClientRect().top;
    setShiftXY({ left: shiftX, top: shiftY });
  };

  return (
    <div
      className="skills-container"
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDrop={handleSkillDrop}
    >
      {props.editFlag ? <p>Edit Skills</p> : <p>Skills</p>}

      <div className="skills-list">
        {props.skills &&
          props.skills.map((skill, ndx) => (
            <span
              className={
                "badge badge-dark" + (props.editFlag ? " badge-edit" : "")
              }
              key={skill.id}
            >
              {skill.name}
              {props.editFlag && (
                <span
                  className="del-skill-badge"
                  onClick={event => handleDelSkill(ndx)}
                >
                  x
                </span>
              )}
            </span>
          ))}
        {props.editFlag && !dispSkillSearchFlag && (
          <button
            id="btn-add-skill"
            className="btn btn-info"
            onClick={handleOpenSkillSearch}
          >
            Add Skill
          </button>
        )}
      </div>
      {dispSkillSearchFlag && dispSkillSearch()}
    </div>
  );

  function dispSkillSearch() {
    return (
      <div className="skill-popup" draggable={true} style={skillSearchCoords}>
        <SkillSearch
          editMode="1"
          searchButton="Add Skill"
          forceRefresh={false}
          handleSkillSelect={handleAddSkill}
          handleSkillStartDrag={handleSkillStartDrag}
          closeBtn={handleCloseSkillSearch}
        />
      </div>
    );
  }
};

export default SkillList;
