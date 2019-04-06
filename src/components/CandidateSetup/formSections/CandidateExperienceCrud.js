import React, { useState, useEffect } from "react";

import SkillList from "../../Skill/SkillList/";
import Highlights from "./Highlights";
import CompanySetup from "../../CompanySetup/";
import { objCopy } from "../../../assets/js/library";

const CandidateExperienceCrud = props => {
  const [showHighlights, setShowHighlights] = useState(false);
  const [origJob, setOrigJob] = useState(null);
  const [showCompany, setShowCompany] = useState(false);
  const job = props.experience;

  useEffect(() => {
    setOrigJob(objCopy(props.experience));
  }, []);

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

  const handleCompanyFocus = event => {
    setShowCompany(!showCompany);
  };

  const passExperienceUp = (tmpExperience, closeModal = false) => {
    props.handleExperienceChange &&
      props.handleExperienceChange(tmpExperience, closeModal);
  };

  const handleSkillsChange = skills => {
    let tmpJob = job;
    tmpJob.skills = skills;
    passExperienceUp(tmpJob);
  };

  const toggleHighlights = () => {
    setShowHighlights(!showHighlights);
  };

  const handleHighlightChange = highlights => {
    let tmpJob = job;
    tmpJob.highlights = highlights;
    passExperienceUp(tmpJob);
  };

  const handleCancel = () => {
    passExperienceUp(origJob, true);
    setShowCompany(false);
  };

  const handleCompanyCancel = () => {
    console.log("cancel company.  just close");
    setShowCompany(false);
  };

  const handleCompanySubmit = companyInfo => {
    setShowCompany(false);
    let tmpJob = job;
    tmpJob.company = companyInfo;
    passExperienceUp(tmpJob);
  };

  return (
    <section className="candidate-job">
      <input type="hidden" name="job-id" value={job.id} />
      {showCompany ? (
        <CompanySetup
          company={job.company}
          handleCancel={handleCompanyCancel}
          handleSubmit={handleCompanySubmit}
        />
      ) : (
        jobForm()
      )}
    </section>
  );

  function jobForm() {
    return (
      <React.Fragment>
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
              onFocus={handleCompanyFocus}
              required
            />
          </div>
        </div>
        {!showHighlights ? (
          <React.Fragment>
            <div className="form-group row">
              <label
                className="col-md-2 col-form-label"
                htmlFor="contactperson"
              >
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
              <label
                className="col-md-2 col-form-label label-right"
                htmlFor="endpay"
              >
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
          </React.Fragment>
        ) : (
          <div className="experience-highlights">
            <Highlights
              highlights={job.highlights}
              handleHighlightChange={handleHighlightChange}
              includeSummaryButton={true}
            />
          </div>
        )}

        <div className="button-section">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.handleCloseModal}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={toggleHighlights}
          >
            {showHighlights ? "Close " : "Open "} Job Highlights
          </button>
        </div>
      </React.Fragment>
    );
  }
};

export default CandidateExperienceCrud;
