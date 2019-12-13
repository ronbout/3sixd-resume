/* CandidateSkillsHeader.js */
import React from "react";

const CandidateSkillsHeader = props => {
	return (
		<div className="candidateskills-header">
			<h2>Candidate Skills - {props.candidateSkills.person.formattedName}</h2>
		</div>
	);
};

export default CandidateSkillsHeader;
