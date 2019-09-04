import React from "react";
import ProfileImg from "../ProfileImg";
import ProfileCompGraph from "../ProfileCompGraph";

const PersonalInfoDisplay = ({ formattedName, pct = 70, candId }) => {
	return (
		<div className="personal-info-display">
			<ProfileImg formattedName={formattedName} />
			<ProfileCompGraph pct={pct} />
			<div>
				<button>Manage My Resumes</button>
			</div>
			<br />
			<div>
				<button>
					<a
						href={`${window.resumeUrl}?id=${candId}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						Create Resume PDF
					</a>
				</button>
			</div>
		</div>
	);
};

export default PersonalInfoDisplay;
