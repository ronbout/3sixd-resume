/* Experience.js */
import React, { useContext } from "react";
import CandidateExperienceContainer from "./CandidateExperienceContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const ExperienceDiv = ({ experience, candId }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = experience => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { experience }
		});
	};

	return (
		<section>
			<CandidateExperienceContainer
				experience={experience}
				candId={candId}
				handleSubmit={handleSubmit}
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
	"480px"
);

const Experience = ({ experience, candId }) => {
	return (
		<section className="Experience profile-section">
			<ExpandExperienceDiv experience={experience} candId={candId} />
		</section>
	);
};

export default React.memo(Experience, (prev, next) =>
	isEqual(prev.experience, next.experience)
);
