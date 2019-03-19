import React from "react";

const CandidateObjective = props => {
  return (
    <section className="candidate-objective candidate-tab-section d-flex">
      <div className="form-group">
        <label htmlFor="objective">Objective:</label>
        <textarea
          className="form-control"
          rows="8"
          name="objective"
          value={props.formFields.objective}
          onChange={event => props.handleInputChange(null, event)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="executiveSummary">Executive Summary:</label>
        <textarea
          className="form-control"
          rows="8"
          name="executiveSummary"
          value={props.formFields.executiveSummary}
          onChange={event => props.handleInputChange(null, event)}
          required
        />
      </div>
    </section>
  );
};

export default CandidateObjective;
