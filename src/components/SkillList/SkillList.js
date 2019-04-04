import React, { useState } from "react";

import SkillSearch from "../SkillSearch/";

import "./css/skillList.css";

const SkillList = props => {
  const [skills, setSkills] = useState(props.skills);
  const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(false);
  const [skillSearchCoords, setSkillSearchCoords] = useState({
    right: "100px",
    top: "200px"
  });

  const handleAddSkill = () => {
    setDispSkillSearchFlag(true);
  };

  const handleDelSkill = ndx => {};

  const handleCloseSkillSearch = () => {
    setDispSkillSearchFlag(false);
  };

  return (
    <div
      className="skills-container"
      onDragOver={props.handleDragOver}
      onDrop={props.handleSkillDrop}
    >
      {props.editFlag ? <p>Edit Skills</p> : <p>Skills</p>}

      <div className="skills-list">
        {skills.map((skill, ndx) => (
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
            className="btn btn-info btn-add-skill"
            onClick={handleAddSkill}
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
          handleSkillSelect={props.handleSkillSelect}
          handleSkillStartDrag={props.handleSkillStartDrag}
          closeBtn={handleCloseSkillSearch}
        />
      </div>
    );
  }
};

export default SkillList;
