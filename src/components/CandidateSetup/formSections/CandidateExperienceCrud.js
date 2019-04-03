import React, { useState } from "react";

const CandidateExperienceCrud = props => {
  const [job, setJob] = useState(props.experience);

  return (
    <section className="candidate-job">
      <input type="hidden" name="job-id" value={job.id} />
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="jobtitle">
          Job Title: *
        </label>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="jobtitle"
            placeholder="Job Title"
            value={job.jobTitle.titleDescription}
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
            name="company"
            placeholder="Company"
            value={job.company.name}
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
            className="form-control"
            name="contactperson"
            placeholder="Contact Person"
            value={job.contactPerson.name}
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
            type="text"
            className="form-control"
            name="contactphone"
            placeholder="Contact Phone #"
            value={job.contactPerson.workPhone}
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
            className="form-control"
            name="startdate"
            placeholder="YYY-MM-DD"
            value={job.startDate}
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
            className="form-control"
            name="enddate"
            placeholder="YYYY-MM-DD"
            value={job.endDate}
          />
        </div>
      </div>
      <div className="form-group row">
        <div class="custom-control custom-radio custom-control-inline">
          <input
            class="custom-control-input"
            type="radio"
            id="salary"
            name="paytype"
            value="Salary"
            checked={job.payType === "Salary"}
          />
          <label class="custom-control-label" htmlFor="salary">
            Salary
          </label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input
            class="custom-control-input"
            type="radio"
            id="hourly"
            name="paytype"
            value="Hourly"
            checked={job.payType === "Hourly"}
          />
          <label class="custom-control-label" htmlFor="hourly">
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
            className="form-control"
            name="startpay"
            placeholder="Starting Pay"
            value={job.startPay}
          />
        </div>
        <label className="col-md-2 col-form-label label-right" htmlFor="endpay">
          Ending Pay:
        </label>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="endpay"
            placeholder="Ending Pay"
            value={job.endPay}
          />
        </div>
      </div>
    </section>
  );
};

export default CandidateExperienceCrud;
