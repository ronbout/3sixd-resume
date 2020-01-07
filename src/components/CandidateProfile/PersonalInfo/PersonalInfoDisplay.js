import React from "react";
import ProfileImg from "../ProfileImg";
// import ProfileCompGraph from "../ProfileCompGraph";
import Button from "styledComponents/Button";
import { Link } from "react-router-dom";

const PersonalInfoDisplay = ({ formattedName, pct = 70, candId }) => {
	return (
		<div className="personal-info-display">
			<ProfileImg formattedName={formattedName} candId={candId} />
			<div>
				<Link to={`/bio/${candId}`}>
					<Button type="button">View Bio Page</Button>
				</Link>
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
