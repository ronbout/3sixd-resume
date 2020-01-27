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
				<Link to={`/custom-resume/${candId}`}>
					<Button type="button">Resume PDF</Button>
				</Link>
			</div>
			<br />
			<div className="pi-button">
				<Link to={`/cand-skills/${candId}`}>
					<Button type="button">Cand Skills</Button>
				</Link>
			</div>
		</div>
	);
};

export default PersonalInfoDisplay;
