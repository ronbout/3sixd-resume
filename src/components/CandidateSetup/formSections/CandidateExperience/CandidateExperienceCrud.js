import React, { useState, useEffect } from "react";

import CandidateExperienceCrudForm from "./CandidateExperienceCrudForm";
import { objCopy } from "../../../../assets/js/library";

const CandidateExperienceCrud = props => {
  const [showHighlights, setShowHighlights] = useState(false);
  //const [origJob, setOrigJob] = useState(objCopy(props.experience));
  const [showCompany, setShowCompany] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [job, setJob] = useState(objCopy(props.experience));

  useEffect(() => {
    setJob(objCopy(props.experience));
    //setOrigJob(objCopy(props.experience));
  }, [props.experience]);

  const handleContactChange = event => {
    // not going to allow change through the
    // input field.  Must use popup
    return;
  };

  const handleInputChange = event => {
    let tmpJob = objCopy(job);
    // the input name is split with hyphen if the data is stored
    // in a sub-object (person-name => person.name)
    if (event.target.name.indexOf("-") !== -1) {
      const targetName = event.target.name.split("-");
      tmpJob[targetName[0]][targetName[1]] = event.target.value;
    } else {
      tmpJob[event.target.name] = event.target.value;
    }
    setJob(tmpJob);
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

  const handleSkillsChange = skills => {
    setJob(prevJob => ({
      ...prevJob,
      skills
    }));
  };

  const toggleHighlights = () => {
    setShowHighlights(!showHighlights);
  };

  const handleHighlightChange = highlights => {
    setJob(prevJob => ({
      ...prevJob,
      highlights
    }));
  };

  const handleSave = event => {
    event && event.preventDefault();
    props.handleSave && props.handleSave(job);
  };

  const handleCancel = () => {
    setShowCompany(false);
    props.handleCancel();
  };

  const handleCompanyCancel = () => {
    setShowCompany(false);
  };

  const handleCompanySubmit = companyInfo => {
    setShowCompany(false);
    setJob(prevJob => ({
      ...prevJob,
      company: companyInfo
    }));
  };

  const handlePersonCancel = () => {
    setShowPerson(false);
  };

  const handlePersonSubmit = personInfo => {
    setShowPerson(false);
    setJob(prevJob => ({
      ...prevJob,
      contactPerson: personInfo
    }));
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
      handleSave={handleSave}
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
