import React, { useState } from "react";

import SkillSearch from "../SkillSearch/";
import MakePopup from "../../../hoc/MakePopup";

import "./css/skillList.css";

const SkillSearchPopup = MakePopup(
  SkillSearch,
  {
    right: "100px",
    top: "200px",
    width: "344px"
  },
  true
);

const SkillList = props => {
  const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(false);
  const [skillDrag, setSkillDrag] = useState(false);

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
  };

  return (
    <div
      className="skills-container"
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
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
      <SkillSearchPopup
        editMode="1"
        searchButton="Add Skill"
        forceRefresh={false}
        handleSkillSelect={handleAddSkill}
        handleSkillStartDrag={handleSkillStartDrag}
        closeBtn={handleCloseSkillSearch}
      />
    );
  }
};

export default SkillList;
