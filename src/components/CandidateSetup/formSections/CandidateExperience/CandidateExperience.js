import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CandidateExperienceCrud from "./CandidateExperienceCrud";
import CandidateModal from "../../CandidateModal";
import ListingHoc from "../../../hoc/ListingHoc";
import CandidateExperienceListDetail from "./CandidateExperienceListDetail";

const CandidateExperience = props => {
  const { sortJobs, actions, editNdx } = props;

  const experienceList = () => {
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
        <ListingHoc
          data={sortJobs}
          actions={actions}
          detailClassname="experience-row"
        >
          <CandidateExperienceListDetail />
        </ListingHoc>
      </div>
    );
  };

  const addButton = () => {
    return (
      <div className="add-job-button">
        <button
          type="button"
          title="Add New Job"
          onClick={props.handleAddNewJob}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    );
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
            handleExperienceChange={props.handleExperienceChange}
            handleCloseModal={props.handleCloseModal}
          />
        </CandidateModal>
      )}
    </section>
  );
};

export default CandidateExperience;
