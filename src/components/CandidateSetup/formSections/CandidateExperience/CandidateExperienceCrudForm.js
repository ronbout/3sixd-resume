import React from "react";

import SkillList from "../../../SkillSetup/SkillList/";
import HighlightsContainer from "../HighlightsContainer";
import CompanySetupContainer from "../../../CompanySetup/";
import PersonSetup from "../../../PersonSetup/";
import MakePopup from "../../../hoc/MakePopup";

const CandidateExperienceCrudForm = props => {
  const { job, showPerson, showCompany, showHighlights } = props;

  const CompanyPopup = MakePopup(
    CompanySetupContainer,
    { left: "250px", top: "200px", width: "1000px" },
    true
  );

  const PersonPopup = MakePopup(
    PersonSetup,
    { left: "250px", top: "200px", width: "1000px" },
    true
  );

  const jobForm = () => {
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
              name="jobTitle"
              placeholder="Job Title"
              value={job.jobTitle}
              onChange={props.handleInputChange}
              required
              disabled={showPerson || showCompany}
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
              onChange={props.handleInputChange}
              onClick={props.handleCompanyClick}
              onFocus={props.handleCompanyClick}
              required
              disabled={showPerson}
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
                  name="contactPerson-formattedName"
                  placeholder="Contact Person"
                  value={job.contactPerson.formattedName}
                  onChange={props.handleInputChange}
                  onClick={props.handlePersonClick}
                  onFocus={props.handlePersonClick}
                  disabled={showCompany}
                />
              </div>
              <label
                className="col-md-2 col-form-label label-right"
                htmlFor="contactphone"
              >
                Contact Work Phone:
              </label>
              <div className="col-md-3">
                <input
                  type="tel"
                  id="contactphone"
                  className="form-control"
                  name="contactPerson-workPhone"
                  placeholder="Contact Phone #"
                  value={job.contactPerson.workPhone}
                  onChange={props.handleContactChange}
                  disabled={true || showPerson || showCompany}
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
                  onChange={props.handleInputChange}
                  required
                  disabled={showPerson || showCompany}
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
                  onChange={props.handleInputChange}
                  disabled={showPerson || showCompany}
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
                  onChange={props.handleInputChange}
                  disabled={showPerson || showCompany}
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
                  onChange={props.handleInputChange}
                  disabled={showPerson || showCompany}
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
              <div className="col-md-2">
                <input
                  type="number"
                  id="startpay"
                  className="form-control"
                  name="startPay"
                  value={job.startPay}
                  onChange={props.handleInputChange}
                  disabled={showPerson || showCompany}
                />
              </div>
              <label
                className="col-md-2 col-form-label label-right"
                htmlFor="endpay"
              >
                Ending Pay:
              </label>
              <div className="col-md-2">
                <input
                  type="number"
                  id="endpay"
                  className="form-control"
                  name="endPay"
                  value={job.endPay}
                  onChange={props.handleInputChange}
                  disabled={showPerson || showCompany}
                />
              </div>
            </div>
            <div className="skill-edit-list">
              <SkillList
                skills={job.skills}
                editFlag={true}
                handleSkillsChange={props.handleSkillsChange}
                candId={props.candId}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className="experience-highlights">
            <HighlightsContainer
              highlights={job.highlights}
              handleHighlightChange={props.handleHighlightChange}
              includeInSummary={true}
              candId={props.candId}
              disabled={showPerson || showCompany}
            />
          </div>
        )}

        <div className="button-section">
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.handleSave}
            disabled={!job.company.id || !job.jobTitle}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.handleCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={props.toggleHighlights}
          >
            {showHighlights ? "Close " : "Open "} Job Highlights
          </button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <section className="candidate-job">
      <input type="hidden" name="job-id" value={job.id} />
      {jobForm()}
      {showCompany && (
        <CompanyPopup
          company={job.company}
          handleCancel={props.handleCompanyCancel}
          handleSubmit={props.handleCompanySubmit}
        />
      )}
      {showPerson && (
        <PersonPopup
          person={job.contactPerson}
          handleCancel={props.handlePersonCancel}
          handleSubmit={props.handlePersonSubmit}
        />
      )}
    </section>
  );
};

export default CandidateExperienceCrudForm;
