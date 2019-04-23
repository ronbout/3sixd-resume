import React, { useState, useEffect } from "react";

import SkillList from "../../Skill/SkillList/";
import MakePopup from "../../../hoc/MakePopup";
import { objCopy } from "../../../assets/js/library";

const CandidateEducationCrud = props => {
  const [origEducation, setOrigEducation] = useState(null);
  const education = props.education;

  useEffect(() => {
    setOrigEducation(objCopy(props.education));
  }, []);

  const handleInputChange = event => {
    let tmpeducation = education;
    // the input name is split with hyphen if the data is stored
    // in a sub-object (person-name => person.name)
    if (event.target.name.indexOf("-") !== -1) {
      const targetName = event.target.name.split("-");
      tmpeducation[targetName[0]][targetName[1]] = event.target.value;
    } else {
      tmpeducation[event.target.name] = event.target.value;
    }
    passEducationUp(tmpeducation);
  };

  const passEducationUp = (tmpEducation, closeModal = false) => {
    props.handleEducationChange &&
      props.handleEducationChange(tmpEducation, closeModal);
  };

  const handleSkillsChange = skills => {
    let tmpeducation = education;
    tmpeducation.skills = skills;
    passEducationUp(tmpeducation);
  };

  const handleCancel = () => {
    passEducationUp(origEducation, true);
  };

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
          <label className="col-2 col-form-label">Degree Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="degreeName"
              placeholder="ex. Bachelor of Computer Science"
              value={education.degreeName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              name="municipality"
              placeholder="City"
              value={education.schoolMunicipality}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="region"
              placeholder="State"
              value={education.schoolRegion}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="countryCode"
              placeholder="Country"
              value={education.schoolCountry}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="skill-edit-list">
          <SkillList
            skills={education.skills}
            editFlag={true}
            handleSkillsChange={handleSkillsChange}
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
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }
};

export default CandidateEducationCrud;
