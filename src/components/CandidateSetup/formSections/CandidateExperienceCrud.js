import React, { useState } from "react";

import SkillList from "../../SkillList/";

const CandidateExperienceCrud = props => {
  const [showHighlights, setShowHighlights] = useState(false);
  const job = props.experience;

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

  const passExperienceUp = tmpExperience => {
    props.handleExperienceChange && props.handleExperienceChange(tmpExperience);
  };

  const handleSkillsChange = skills => {
    let tmpJob = job;
    tmpJob.skills = skills;
    passExperienceUp(tmpJob);
  };

  const openHighlights = () => {
    console.log("open highlights here");
  };

  return (
    <section className="candidate-job">
      <input type="hidden" name="job-id" value={job.id} />
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="titleDescription">
          Job Title: *
        </label>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            id="titleDescription"
            name="jobTitle-titleDescription"
            placeholder="Job Title"
            value={job.jobTitle.titleDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <label
          className="col-md-2 col-form-label label-right"
          htmlFor="company"
        >
          Company: *
        </label>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            id="company"
            name="company-name"
            placeholder="Company"
            value={job.company.name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="contactperson">
          Contact Person:
        </label>
        <div className="col-md-3">
          <input
            type="text"
            id="contactperson"
            className="form-control"
            name="contactPerson-name"
            placeholder="Contact Person"
            value={job.contactPerson.name}
            onChange={handleInputChange}
          />
        </div>
        <label
          className="col-md-2 col-form-label label-right"
          htmlFor="contactphone"
        >
          Contact Phone:
        </label>
        <div className="col-md-3">
          <input
            type="tel"
            id="contactphone"
            className="form-control"
            name="contactPerson-workPhone"
            placeholder="Contact Phone #"
            value={job.contactPerson.workPhone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="startdate">
          Start Date: *
        </label>
        <div className="col-md-3">
          <input
            type="date"
            id="startdate"
            className="form-control"
            name="startDate"
            placeholder="YYY-MM-DD"
            value={job.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <label
          className="col-md-2 col-form-label label-right"
          htmlFor="enddate"
        >
          End Date:
        </label>
        <div className="col-md-3">
          <input
            type="date"
            id="enddate"
            className="form-control"
            name="endDate"
            placeholder="YYYY-MM-DD"
            value={job.endDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="salary"
            className="custom-control-input"
            name="payType"
            value="Salary"
            checked={job.payType === "Salary"}
            onChange={handleInputChange}
          />
          <label className="custom-control-label" htmlFor="salary">
            Salary
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="hourly"
            className="custom-control-input"
            name="payType"
            value="Hourly"
            checked={job.payType === "Hourly"}
            onChange={handleInputChange}
          />
          <label className="custom-control-label" htmlFor="hourly">
            Hourly
          </label>
        </div>
        <label
          className="col-md-2 col-form-label label-right"
          htmlFor="startpay"
        >
          Starting Pay:
        </label>
        <div className="col-md-3">
          <input
            type="number"
            id="startpay"
            className="form-control"
            name="startPay"
            placeholder="Starting Pay"
            value={job.startPay}
            onChange={handleInputChange}
          />
        </div>
        <label className="col-md-2 col-form-label label-right" htmlFor="endpay">
          Ending Pay:
        </label>
        <div className="col-md-3">
          <input
            type="number"
            id="endpay"
            className="form-control"
            name="endPay"
            placeholder="Ending Pay"
            value={job.endPay}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="skill-edit-list">
        <SkillList
          skills={job.skills}
          editFlag={true}
          handleSkillsChange={handleSkillsChange}
        />
      </div>
      <div className="button-section">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.handleCloseModal}
        >
          Close
        </button>

        <button type="button" className="btn btn-info" onClick={openHighlights}>
          Highlights
        </button>
      </div>
    </section>
  );
};

export default CandidateExperienceCrud;
