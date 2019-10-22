import React from "react";
import ProfileImg from "../ProfileImg";
import ProfileCompGraph from "../ProfileCompGraph";
import Button from "styledComponents/Button";

const PersonalInfoDisplay = ({ formattedName, pct = 70, candId }) => {
	return (
		<div className="personal-info-display">
			<ProfileImg formattedName={formattedName} />
			<ProfileCompGraph pct={pct} />
			<div>
				<Button>Manage Resumes</Button>
			</div>
			<br />
			<div>
				<Button href={`${window.resumeUrl}?id=${candId}`} target="_blank">
					Resume PDF
				</Button>
			</div>
		</div>
	);
};

export default PersonalInfoDisplay;
