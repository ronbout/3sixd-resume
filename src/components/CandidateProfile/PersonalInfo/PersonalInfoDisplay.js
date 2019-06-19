import React from "react";
import candidateImg from "../../../assets/img/candidate2.jpg";

const PersonalInfoDisplay = props => {
  return (
    <section className="tsd-card personal-info-display">
      <div className="personal-image">
        <img
          src={candidateImg}
          alt="Candidate Image"
          className="candidate-img"
        />
      </div>
    </section>
  );
};

export default PersonalInfoDisplay;
