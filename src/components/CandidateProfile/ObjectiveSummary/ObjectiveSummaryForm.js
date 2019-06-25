import React from "react";

const ObjectiveSummaryForm = props => {
  return (
    <form className="objective-form" onSubmit={props.handleSubmit}>
      <label>Objective:</label>
      <textarea
        className=""
        rows="4"
        maxLength="499"
        name="objective"
        value={props.formFields.objective}
        onChange={props.handleInputChange}
        required
      />
      <label>Executive Summary:</label>
      <textarea
        className=""
        rows="6"
        name="executiveSummary"
        value={props.formFields.executiveSummary}
        onChange={props.handleInputChange}
        required
      />
    </form>
  );
};

export default ObjectiveSummaryForm;
