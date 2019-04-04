import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/candidateExperience.css";
import CandidateExperienceCrud from "./CandidateExperienceCrud";
import CandidateModal from "../CandidateModal";

const CandidateExperience = props => {
  const [editNdx, setEditNdx] = useState(false);
  const [sortJobs, setSortJobs] = useState(
    props.formFields.experience.sort((a, b) => a.startDate - b.startDate)
  );

  const passExperienceUp = tmpExperience => {
    props.handleExperienceChange && props.handleExperienceChange(tmpExperience);
  };

  const handleDelExperience = ndx => {
    const tmp = props.formFields.experience.slice();
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

  const handleExperienceChange = tmpExper => {
    let tmp = props.formFields.experience.slice();
    tmp[editNdx].experience = tmpExper;
    passExperienceUp(tmp);
  };

  const handleDblClick = ndx => {};

  return (
    <section className="candidate-experience candidate-tab-section">
      {props.formFields.experience && experienceList()}
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
        {sortJobs.map((item, ndx) => (
          <div
            key={ndx}
            className="experience-row"
            onDoubleClick={() => handleDblClick(ndx)}
          >
            <div>
              <input
                type="text"
                size="20"
                name={"experiencetitle-" + ndx}
                value={item.jobTitle.titleDescription}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                size="20"
                name={"experiencecompany-" + ndx}
                value={item.company.name}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                size="10"
                name={"experiencestartdate-" + ndx}
                value={item.startDate}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                size="10"
                name={"experiencestartdate-" + ndx}
                value={item.endDate ? item.endDate : "current"}
                disabled
              />
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-danger"
                title="Delete experience"
                onClick={() => handleDelExperience(ndx)}
              >
                X
              </button>
            </div>
            <div className="">
              <button
                type="button"
                title="Edit Experience"
                className="btn btn-info"
                onClick={() => handleDispEditModal(ndx)}
              >
                <FontAwesomeIcon icon="edit" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default CandidateExperience;
