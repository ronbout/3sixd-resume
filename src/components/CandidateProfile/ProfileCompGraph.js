import React from "react";
import ProgressBar from "styledComponents/ProgressBar";

const ProfileCompGraph = ({ pct = 70 }) => {
	return (
		<div className="comp-graph-container">
			<div>
				<ProgressBar id="candidate-complete-pct" value={pct} />
			</div>
			<p>Profile: {pct} Complete</p>
		</div>
	);
};

export default ProfileCompGraph;
