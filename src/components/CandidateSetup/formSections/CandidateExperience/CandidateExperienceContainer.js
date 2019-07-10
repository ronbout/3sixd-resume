import React, { useState } from "react";

import CandidateExperience from "./CandidateExperience";
import "./css/candidateExperience.css";
import { objCopy } from "../../../../assets/js/library";

const CandidateExperienceContainer = props => {
  const [editNdx, setEditNdx] = useState(false);
  const [sortJobs, setSortJobs] = useState(
    props.formFields.experience
      ? props.formFields.experience.sort((a, b) => a.startDate - b.startDate)
      : []
  );

  const emptyExperience = {
    id: "",
    candidateId: props.formFields.id,
    company: {
      id: "",
      name: ""
    },
    startDate: "",
    endDate: "",
    contactPerson: {
      id: "",
      name: "",
      workPhone: ""
    },
    payType: "Salary",
    startPay: "",
    endpay: "",
    jobTitle: {
      id: "",
      candidateId: props.formFields.id,
      titleDescription: ""
    },
    summary: "",
    skills: [],
    highlights: []
  };

  const passExperienceUp = tmpExperience => {
    props.handleExperienceChange && props.handleExperienceChange(tmpExperience);
  };

  const handleDelExperience = ndx => {
    const tmp = sortJobs.slice();
    tmp.splice(ndx, 1);
    passExperienceUp(tmp);
    setSortJobs(tmp.sort((a, b) => a.startDate - b.startDate));
  };

  const handleDispEditModal = ndx => {
    setEditNdx(ndx);
  };

  const handleCloseModal = () => {
    setEditNdx(false);
  };

  const handleExperienceChange = (tmpExper, closeModal = false) => {
    let tmp = sortJobs.slice();
    tmp[editNdx] = objCopy(tmpExper);
    passExperienceUp(tmp);
    setSortJobs(tmp);
    closeModal && handleCloseModal();
  };

  const handleAddNewJob = () => {
    // add empty job to list if not already empty
    // set editNdx to this new element
    sortJobs.push(emptyExperience);
    console.log(sortJobs);
    setEditNdx(sortJobs.length - 1);
  };

  const actions = {
    delete: handleDelExperience,
    edit: handleDispEditModal
  };

  return (
    <CandidateExperience
      sortJobs={sortJobs}
      actions={actions}
      editNdx={editNdx}
      formFields={props.formFields}
      handleAddNewJob={handleAddNewJob}
      handleExperienceChange={handleExperienceChange}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default CandidateExperienceContainer;
