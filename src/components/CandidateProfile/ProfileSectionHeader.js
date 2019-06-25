import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileSectionHeader = props => {
  return (
    <div className="pi-header profile-section-header">
      <span>
        <h2>{props.headerTitle || "Section Header"}</h2>
      </span>
      <span>
        <h2>({props.profilePercentage || 0}%)</h2>
      </span>
      <span>
        <h2>
          {props.profileSectionCompleted && <FontAwesomeIcon icon="check" />}
        </h2>
      </span>
      {props.slider && (
        <span className="slider-arrow" onClick={props.handleSlider}>
          <FontAwesomeIcon icon={props.slider} />
        </span>
      )}
    </div>
  );
};

export default ProfileSectionHeader;
