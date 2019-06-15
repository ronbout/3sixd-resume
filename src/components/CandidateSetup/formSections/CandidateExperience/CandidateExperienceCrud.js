import React, { useState, useEffect } from "react";

import CandidateExperienceCrudForm from "./CandidateExperienceCrudForm";
import { objCopy } from "../../../../assets/js/library";

const CandidateExperienceCrud = props => {
  const [showHighlights, setShowHighlights] = useState(false);
  const [origJob, setOrigJob] = useState(null);
  const [showCompany, setShowCompany] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const job = props.experience;

  useEffect(() => {
    setOrigJob(objCopy(props.experience));
  }, []);

  const handleContactChange = event => {
    // not going to allow change through the
    // input field.  Must use popup
    return;
  };

  const handleInputChange = event => {
    let tmpJob = job;
    // the input name is split with hyphen if the data is stored
    // in a sub-object (person-name => person.name)
    if (event.target.name.indexOf("-") !== -1) {
      const targetName = event.target.name.split("-");
      tmpJob[targetName[0]][targetName[1]] = event.target.value;
    } else {
      tmpJob[event.target.name] = event.target.value;
    }
    passExperienceUp(tmpJob);
  };

  const handleCompanyClick = event => {
    // do not open if Person is already open
    if (showPerson && !showCompany) return;
    setShowCompany(!showCompany);
  };

  const handlePersonClick = event => {
    // do not open if Company is already open
    if (showCompany && !showPerson) return;
    setShowPerson(!showPerson);
  };

  const passExperienceUp = (tmpExperience, closeModal = false) => {
    props.handleExperienceChange &&
      props.handleExperienceChange(tmpExperience, closeModal);
  };

  const handleSkillsChange = skills => {
    let tmpJob = job;
    tmpJob.skills = skills;
    passExperienceUp(tmpJob);
  };

  const toggleHighlights = () => {
    setShowHighlights(!showHighlights);
  };

  const handleHighlightChange = highlights => {
    let tmpJob = job;
    tmpJob.highlights = highlights;
    passExperienceUp(tmpJob);
  };

  const handleCancel = () => {
    passExperienceUp(origJob, true);
    setShowCompany(false);
  };

  const handleCompanyCancel = () => {
    setShowCompany(false);
  };

  const handleCompanySubmit = companyInfo => {
    setShowCompany(false);
    let tmpJob = job;
    tmpJob.company = companyInfo;
    passExperienceUp(tmpJob);
  };

  const handlePersonCancel = () => {
    setShowPerson(false);
  };

  const handlePersonSubmit = personInfo => {
    setShowPerson(false);
    let tmpJob = job;
    tmpJob.contactPerson = personInfo;
    passExperienceUp(tmpJob);
  };

  return (
    <CandidateExperienceCrudForm
      job={job}
      showPerson={showPerson}
      showCompany={showCompany}
      showHighlights={showHighlights}
      handleInputChange={handleInputChange}
      handleCompanyClick={handleCompanyClick}
      handlePersonClick={handlePersonClick}
      handleContactChange={handleContactChange}
      handleSkillsChange={handleSkillsChange}
      handleHighlightChange={handleHighlightChange}
      handleCloseModal={props.handleCloseModal}
      handleCancel={handleCancel}
      toggleHighlights={toggleHighlights}
      handlePersonCancel={handlePersonCancel}
      handlePersonSubmit={handlePersonSubmit}
      handleCompanyCancel={handleCompanyCancel}
      handleCompanySubmit={handleCompanySubmit}
    />
  );
};

export default CandidateExperienceCrud;
