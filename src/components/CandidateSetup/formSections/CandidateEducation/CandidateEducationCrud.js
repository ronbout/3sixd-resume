import React, { useState, useEffect } from "react";

import CandidateEducationCrudForm from "./CandidateEducationCrudForm";
import { objCopy } from "../../../../assets/js/library";

const CandidateEducationCrud = props => {
  //const [origEducation, setOrigEducation] = useState(null);
  const [education, setEducation] = useState(objCopy(props.education));

  useEffect(() => {
    setEducation(objCopy(props.education));
  }, [props.education]);

  const handleInputChange = event => {
    let tmpeducation = objCopy(education);
    // the input name is split with hyphen if the data is stored
    // in a sub-object (person-name => person.name)
    if (event.target.name.indexOf("-") !== -1) {
      const targetName = event.target.name.split("-");
      tmpeducation[targetName[0]][targetName[1]] = event.target.value;
    } else {
      tmpeducation[event.target.name] = event.target.value;
    }
    setEducation(tmpeducation);
  };

  const handleSkillsChange = skills => {
    setEducation(prevEd => ({
      ...prevEd,
      skills
    }));
  };

  const handleSave = event => {
    event && event.preventDefault();
    props.handleSave && props.handleSave(education);
  };

  const handleCancel = () => {
    props.handleCancel();
  };

  return (
    <CandidateEducationCrudForm
      education={education}
      handleInputChange={handleInputChange}
      handleSkillsChange={handleSkillsChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
    />
  );
};

export default CandidateEducationCrud;
