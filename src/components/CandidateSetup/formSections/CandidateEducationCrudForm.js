import React from "react";

import SkillList from "../../SkillSetup/SkillList/";

const CandidateEducationCrudForm = props => {
  const { education } = props;
  return (
    <section className="candidate-education-detail">
      <input type="hidden" name="education-id" value={education.id} />
      {educationForm()}
    </section>
  );

  function educationForm() {
    return (
      <React.Fragment>
        <div className="form-group row">
          <label className="col-2 col-form-label">School Name: *</label>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              name="schoolName"
              value={education.schoolName}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Degree Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="degreeName"
              placeholder="ex. Bachelor of Computer Science"
              value={education.degreeName}
              onChange={props.handleInputChange}
              required
            />
          </div>

          <label className="col-2 col-form-label label-right">
            Degree Type: *
          </label>
          <div className="col-3">
            <select
              className="form-control"
              value={education.degreeType}
              onChange={props.handleInputChange}
              required
            >
              <option value="non-Degree">Non Degree</option>
              <option value="Bachelors">Bachelor's</option>
              <option value="Masters">Master's</option>
              <option value="Doctorate">Doctorate</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>
        </div>
        {/* City / State / Zip */}
        <div className="form-group row">
          <label className="col-2 col-form-label">City/State/Country:</label>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="schoolMunicipality"
              placeholder="City"
              value={education.schoolMunicipality}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="schoolRegion"
              placeholder="State"
              value={education.schoolRegion}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="schoolCountry"
              placeholder="Country"
              value={education.schoolCountry}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Start Date:</label>
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              name="startDate"
              placeholder="YYY-MM-DD"
              value={education.startDate}
              onChange={props.handleInputChange}
            />
          </div>
          <label className="col-2 col-form-label label-right" htmlFor="enddate">
            End Date:
          </label>
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              name="endDate"
              placeholder="YYYY-MM-DD"
              value={education.endDate}
              onChange={props.handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">Major: </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="degreeMajor"
              placeholder="Degree Major"
              value={education.degreeMajor}
              onChange={props.handleInputChange}
            />
          </div>
          <label className="col-2 col-form-label">Minor: </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="degreeMinor"
              placeholder="Degree Minor"
              value={education.degreeMinor}
              onChange={props.handleInputChange}
            />
          </div>
        </div>

        <div className="skill-edit-list">
          <SkillList
            skills={education.skills}
            editFlag={true}
            handleSkillsChange={props.handleSkillsChange}
          />
        </div>
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
            onClick={props.handleCancel}
          >
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }
};

export default CandidateEducationCrudForm;
