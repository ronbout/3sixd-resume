import React from "react";
import ProfileImg from "../ProfileImg";
// import ProfileCompGraph from "../ProfileCompGraph";
import Button from "styledComponents/Button";
import { Link } from "react-router-dom";

const PersonalInfoDisplay = ({ formattedName, candId }) => {
	return (
		<div className="personal-info-display">
			<ProfileImg formattedName={formattedName} candId={candId} />
			<div style={{ marginTop: "48px" }} className="pi-button">
				<Link to={`/bio/${candId}`}>
					<Button type="button">View Bio Page</Button>
				</Link>
			</div>
			<br />
			<div className="pi-button">
				<Button href={`/custom-resume/${candId}`} target="_blank">
					Resume PDF
				</Button>
			</div>
			<br />
			<div className="pi-button">
				<Button href={`/cannd-skills/${candId}`} target="_blank">
					Cand Skills
				</Button>
			</div>
		</div>
	);
};

export default PersonalInfoDisplay;
