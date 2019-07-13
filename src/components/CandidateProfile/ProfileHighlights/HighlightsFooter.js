import React from "react";

const HighlightsFooter = props => {
  return (
    <div className="high-footer profile-section-footer">
      <button className="profile-save-btn" onClick={props.handleSubmit}>
        Update Highlights
      </button>
    </div>
  );
};

export default HighlightsFooter;
