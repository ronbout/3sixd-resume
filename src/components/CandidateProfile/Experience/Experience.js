/* Experience.js */
import React, { useContext } from "react";
import CandidateExperienceContainer from "./CandidateExperienceContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const ExperienceDiv = ({ experience, candId, setShowSkills }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = (experience) => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { experience },
		});
	};

	return (
		<section>
			<CandidateExperienceContainer
				experience={experience}
				candId={candId}
				handleSubmit={handleSubmit}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

const ExpandExperienceDiv = MakeExpansion(
	ExperienceDiv,
	"Experience",
	null,
	false,
	0,
	"386px"
);

const Experience = ({ experience, candId, setShowSkills }) => {
	return (
		<section className="Experience profile-section">
			<ExpandExperienceDiv
				experience={experience}
				candId={candId}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

export default React.memo(Experience, (prev, next) =>
	isEqual(prev.experience, next.experience)
);
