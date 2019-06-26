import React from "react";
import ProfileImg from "../ProfileImg";
import ProfileCompGraph from "../ProfileCompGraph";

const PersonalInfoDisplay = props => {
  return (
    <div className="personal-info-display">
      <ProfileImg formattedName={props.formattedName} />
      <ProfileCompGraph pct={70} />
      <div>
        <button>Manage My Resumes</button>
      </div>
    </div>
  );
};

export default PersonalInfoDisplay;
