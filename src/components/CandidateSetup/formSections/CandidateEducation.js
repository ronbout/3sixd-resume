import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/candidateEducation.css";
import CandidateEducationCrud from "./CandidateEducationCrud";
import CandidateModal from "../CandidateModal";
import ListingHoc from "../../hoc/ListingHoc";
import CandidateEducationListDetail from "./CandidateEducationListDetail";

const CandidateEducation = props => {
  const { editNdx, formFields, sortEducation, actions } = props;
  return (
    <section className="candidate-education candidate-tab-section">
      {formFields.education && educationList()}
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
            handleEducationChange={props.handleEducationChange}
            handleCloseModal={props.handleCloseModal}
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
        <ListingHoc
          data={sortEducation}
          actions={actions}
          detailClassname="education-row"
        >
          <CandidateEducationListDetail />
        </ListingHoc>
      </div>
    );
  }

  function addButton() {
    return (
      <div className="add-education-button">
        <button
          type="button"
          title="Add New Job"
          onClick={props.handleAddNewEducation}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
  }
};

export default CandidateEducation;
