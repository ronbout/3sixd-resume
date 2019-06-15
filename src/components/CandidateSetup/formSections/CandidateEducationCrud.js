import React, { useState, useEffect } from "react";

import CandidateEducationCrudForm from "./CandidateEducationCrudForm";
import { objCopy } from "../../../assets/js/library";

const CandidateEducationCrud = props => {
  const [origEducation, setOrigEducation] = useState(null);
  const education = props.education;

  useEffect(() => {
    setOrigEducation(objCopy(props.education));
  }, []);

  const handleInputChange = event => {
    console.log(
      "handleinputchange: ",
      event.target.name,
      "<br>",
      event.target.value
    );
    let tmpeducation = education;
    // the input name is split with hyphen if the data is stored
    // in a sub-object (person-name => person.name)
    if (event.target.name.indexOf("-") !== -1) {
      const targetName = event.target.name.split("-");
      tmpeducation[targetName[0]][targetName[1]] = event.target.value;
    } else {
      tmpeducation[event.target.name] = event.target.value;
    }
    passEducationUp(tmpeducation);
  };

  const passEducationUp = (tmpEducation, closeModal = false) => {
    props.handleEducationChange &&
      props.handleEducationChange(tmpEducation, closeModal);
  };

  const handleSkillsChange = skills => {
    let tmpeducation = education;
    tmpeducation.skills = skills;
    passEducationUp(tmpeducation);
  };

  const handleCancel = () => {
    passEducationUp(origEducation, true);
  };

  return (
    <CandidateEducationCrudForm
      education={education}
      handleInputChange={handleInputChange}
      handleSkillsChange={handleSkillsChange}
      handleCancel={handleCancel}
      handleCloseModal={props.handleCloseModal}
    />
  );
};

export default CandidateEducationCrud;
