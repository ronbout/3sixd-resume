import React from "react";

const ObjectiveSummaryForm = props => {
  return (
    <div className="objective-form">
      <label>Objective:</label>
      <textarea
        className=""
        rows="4"
        maxLength="499"
        name="objective"
        value={props.objective}
        onChange={props.handleInputChange}
        required
      />
      <label>Executive Summary:</label>
      <textarea
        className=""
        rows="6"
        name="executiveSummary"
        value={props.executiveSummary}
        onChange={props.handleInputChange}
        required
      />
    </div>
  );
};

export default ObjectiveSummaryForm;
