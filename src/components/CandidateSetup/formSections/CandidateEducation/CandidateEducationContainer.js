import React, { useState } from "react";

import CandidateEducation from "./CandidateEducation";
import { objCopy } from "../../../../assets/js/library";
import "./css/candidateEducation.css";

const CandidateEducationContainer = props => {
  const [editNdx, setEditNdx] = useState(false);
  const [sortEducation, setSortEducation] = useState(
    props.formFields.education.sort((a, b) => a.startDate - b.startDate)
  );

  const emptyEducation = {
    id: "",
    candidateId: props.formFields.id,
    schoolName: "",
    schoolMunicipality: "",
    schoolRegion: "",
    schoolCountry: "",
    degreeName: "",
    degreeType: "",
    degreeMajor: "",
    degreeMinor: "",
    startDate: "",
    endDate: "",
    skills: []
  };

  const passEducationUp = tmpEducation => {
    props.handleEducationChange && props.handleEducationChange(tmpEducation);
  };

  const handleDelEducation = ndx => {
    const tmp = sortEducation.slice();
    tmp.splice(ndx, 1);
    passEducationUp(tmp);
    setSortEducation(tmp.sort((a, b) => a.startDate - b.startDate));
  };

  const handleDispEditModal = ndx => {
    setEditNdx(ndx);
  };

  const handleCloseModal = () => {
    setEditNdx(false);
  };

  const handleEducationChange = (tmpExper, closeModal = false) => {
    console.log("handleEducationChange container", tmpExper);
    let tmp = sortEducation.slice();
    tmp[editNdx] = objCopy(tmpExper);
    passEducationUp(tmp);
    setSortEducation(tmp);
    closeModal && handleCloseModal();
  };

  const handleAddNewEducation = () => {
    // add empty job to list if not already empty
    // set editNdx to this new element
    sortEducation.push(emptyEducation);
    console.log(sortEducation);
    setEditNdx(sortEducation.length - 1);
  };

  const actions = {
    delete: handleDelEducation,
    edit: handleDispEditModal
  };

  return (
    <CandidateEducation
      formFields={props.formFields}
      editNdx={editNdx}
      sortEducation={sortEducation}
      actions={actions}
      handleEducationChange={handleEducationChange}
      handleCloseModal={handleCloseModal}
      handleAddNewEducation={handleAddNewEducation}
    />
  );
};

export default CandidateEducationContainer;
