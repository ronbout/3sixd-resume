/* CandidateList.js */
import React from "react";

const CandidateList = ({ candidates }) => {
	return (
		<div>
			<h1>Candidate listing</h1>
			{candidates.map(c => {
				return (
					<div>
						{c.personFormattedName} - {c.jobTitle ? c.jobTitle : ""}
					</div>
				);
			})}
		</div>
	);
};

export default CandidateList;
