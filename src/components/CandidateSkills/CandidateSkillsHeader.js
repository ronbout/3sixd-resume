import React from "react";

const CandidateSkillsHeader = props => {
  return (
    <div className="tsd-card candidateskills-header">
      <h1>Candidate Skills</h1>
      <h2>{props.candidateSkills.person.formattedName}</h2>
    </div>
  );
};

export default CandidateSkillsHeader;
