import React, { useState, useEffect } from "react";

import CandidateExperience from "./CandidateExperience";
import "./css/candidateExperience.css";
import { objCopy } from "../../../../assets/js/library";
import dataFetch from "../../../../assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_EXPERIENCE = "/experience";

const CandidateExperienceContainer = props => {
  const [editNdx, setEditNdx] = useState(false);
  const [sortJobs, setSortJobs] = useState(
    props.experience
      ? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
      : []
  );

  const emptyExperience = {
    id: "",
    candidateId: props.candId || "",
    company: {
      id: "",
      name: "",
      description: "",
      municipality: "",
      region: "",
      countryCode: ""
    },
    startDate: "",
    endDate: "",
    contactPerson: {
      id: "",
      formattedName: "",
      givenName: "",
      familyName: "",
      mobilePhone: "",
      workPhone: "",
      addressLine1: "",
      addressLine2: "",
      municipality: "",
      region: "",
      postalCode: "",
      countryCode: "",
      email1: "",
      website: ""
    },
    payType: "Salary",
    startPay: "",
    endPay: "",
    jobTitleId: "",
    jobTitle: "",
    summary: "",
    skills: [],
    highlights: []
  };

  useEffect(() => {
    setSortJobs(
      props.experience
        ? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
        : []
    );
  }, [props.experience]);

  const updateExperience = async experiences => {
    let body = {
      experience: objCopy(experiences).map(exp => {
        const contactPersonId = exp.contactPerson ? exp.contactPerson.id : "";
        const companyId = exp.company ? exp.company.id : "";
        return {
          ...exp,
          contactPersonId,
          companyId
        };
      })
    };

    const id = props.candId;
    const httpMethod = "PUT";
    const endpoint = `${API_CANDIDATES}${id}${API_EXPERIENCE}`;

    let result = await dataFetch(endpoint, "", httpMethod, body);
    if (result.error) {
      console.log("fetch error: ", result);
      handleCancel();
    } else {
      // need user message here
      props.handleExperienceChange(result);
    }
  };

  const handleDelExperience = ndx => {
    /**
     *
     * must have warning here!!!
     *
     *
     *
     */
    const tmp = sortJobs.slice();
    tmp.splice(ndx, 1);
    updateExperience(tmp);
  };

  const handleDispEditModal = ndx => {
    setEditNdx(ndx);
  };

  const handleCloseModal = () => {
    setEditNdx(false);
  };

  const handleSave = exp => {
    const tmp = sortJobs.slice();
    tmp[editNdx] = exp;
    updateExperience(tmp);
    handleCloseModal();
  };

  const handleAddNewJob = () => {
    // add empty job to list if not already empty
    // set editNdx to this new element
    sortJobs.push(emptyExperience);
    setEditNdx(sortJobs.length - 1);
  };

  const handleCancel = () => {
    setEditNdx(false);
    setSortJobs(
      props.experience
        ? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
        : []
    );
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
      handleAddNewJob={handleAddNewJob}
      handleSave={handleSave}
      handleCancel={handleCancel}
      candId={props.candId}
    />
  );
};

export default CandidateExperienceContainer;
