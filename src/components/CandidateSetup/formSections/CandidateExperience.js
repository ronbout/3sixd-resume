import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/candidateExperience.css";
import CandidateExperienceCrud from "./CandidateExperienceCrud";
import CandidateModal from "../CandidateModal";
import ListingHoc from "../../hoc/ListingHoc";
import CandidateExperienceListDetail from "./CandidateExperienceListDetail";
import { objCopy } from "../../../assets/js/library";

const CandidateExperience = props => {
  const [editNdx, setEditNdx] = useState(false);
  const [sortJobs, setSortJobs] = useState(
    props.formFields.experience.sort((a, b) => a.startDate - b.startDate)
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
    <section className="candidate-experience candidate-tab-section">
      {props.formFields.experience && experienceList()}
      {addButton()}
      {editNdx !== false && (
        <CandidateModal
          showModal={editNdx !== false}
          modalHeader="Candidate Experience Entry/Update"
          idName="candidate-modal"
          hideClose={true}
        >
          <CandidateExperienceCrud
            experience={sortJobs[editNdx]}
            handleExperienceChange={handleExperienceChange}
            handleCloseModal={handleCloseModal}
          />
        </CandidateModal>
      )}
    </section>
  );

  function experienceList() {
    return (
      <div className="experience-list justify-content-center">
        <div className="experience-row">
          <div className="heading">Job Title</div>
          <div className="heading">Company Name</div>
          <div className="heading">Start Date</div>
          <div className="heading">End Date</div>
          <div className="heading">Delete</div>
          <div className="heading">Edit</div>
        </div>
        {ListingHoc(
          CandidateExperienceListDetail,
          sortJobs,
          actions,
          "experience-row"
        )}
      </div>
    );
  }

  function addButton() {
    return (
      <div className="add-job-button">
        <button type="button" title="Add New Job" onClick={handleAddNewJob}>
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
  }
};

export default CandidateExperience;
