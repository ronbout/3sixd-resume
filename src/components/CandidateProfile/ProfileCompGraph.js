import React from "react";

const ProfileCompGraph = props => {
  // set up width of span from props
  const styleWidth = { width: props.pct + "%" };
  return (
    <div className="comp-graph-container">
      <div className="tsd-bargraph">
        <span style={styleWidth} className="tsd-bargraph-span" />
      </div>
      <p>Profile: {props.pct} Complete</p>
    </div>
  );
};

export default ProfileCompGraph;
