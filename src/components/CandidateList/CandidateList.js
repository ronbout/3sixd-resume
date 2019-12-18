/* CandidateList.js */
import React from "react";

const CandidateList = ({ candidates }) => {
	return (
		<div>
			<h1>Candidate listing</h1>
			{candidates.map(c => {
				return (
					<div key={c.id}>
						{c.personFormattedName} - {c.jobTitle ? c.jobTitle : ""} -{" "}
						{c.skillList}
					</div>
				);
			})}
		</div>
	);
};

export default CandidateList;
