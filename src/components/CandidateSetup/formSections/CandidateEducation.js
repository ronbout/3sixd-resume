import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/candidateEducation.css";
import CandidateEducationCrud from "./CandidateEducationCrud";
import CandidateModal from "../CandidateModal";
import ListingHoc from "../../hoc/ListingHoc";
import CandidateEducationListDetail from "./CandidateEducationListDetail";
import { objCopy } from "../../../assets/js/library";

const CandidateEducation = props => {
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
    <section className="candidate-education candidate-tab-section">
      {props.formFields.education && educationList()}
      {addButton()}
      {editNdx !== false && (
        <CandidateModal
          showModal={editNdx !== false}
          modalHeader="Candidate Education Entry/Update"
          idName="candidate-modal"
          hideClose={true}
        >
          <CandidateEducationCrud
            education={sortEducation[editNdx]}
            handleEducationChange={handleEducationChange}
            handleCloseModal={handleCloseModal}
          />
        </CandidateModal>
      )}
    </section>
  );

  function educationList() {
    return (
      <div className="education-list justify-content-center">
        <div className="education-row">
          <div className="heading">Degree</div>
          <div className="heading">School</div>
          <div className="heading">Start Date</div>
          <div className="heading">End Date</div>
          <div className="heading">Delete</div>
          <div className="heading">Edit</div>
        </div>
        {ListingHoc(
          CandidateEducationListDetail,
          sortEducation,
          actions,
          "education-row"
        )}
      </div>
    );
  }

  function addButton() {
    return (
      <div className="add-education-button">
        <button
          type="button"
          title="Add New Job"
          onClick={handleAddNewEducation}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
  }
};

export default CandidateEducation;
