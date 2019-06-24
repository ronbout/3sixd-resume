import React from "react";

const SectionCompletedMark = props => {
  return (
    <span className="complete-mark">{props.completed && "Completed"}</span>
  );
};

export default SectionCompletedMark;
