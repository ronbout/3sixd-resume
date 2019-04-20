import React from "react";

const HighlightDetail = props => {
  return (
    <textarea
      className={
        (!props.editFlag || props.editSkillNdx !== ndx) &&
        props.dispSkillNdx === ndx
          ? "dark-disabled"
          : ""
      }
      rows="2"
      name={"highlight-" + props.ndx}
      value={props.item.highlight}
      onChange={event => handleEditHighlight(props.ndx, event)}
      disabled={!props.editFlag || props.editSkillNdx !== props.ndx}
    />
  );
};

export default HighlightDetail;
