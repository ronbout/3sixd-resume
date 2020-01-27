/* Experience.js */
import React, { useState, useEffect, useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateExperienceContainer from "./CandidateExperienceContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";
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

const Experience = props => {
	const [experience, setExperience] = useState(objCopy(props.experience));

	// useEffect(() => {
	// 	console.log("***  Experience rendered ***");
	// });

	useEffect(() => {
		setExperience(objCopy(props.experience));
	}, [props.experience]);

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Experience"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandExperienceDiv = makeExpansion(
		ExperienceDiv,
		header,
		null,
		false,
		0
	);

	return (
		<section className="Experience profile-section">
			<ExpandExperienceDiv experience={experience} candId={props.candId} />
		</section>
	);
};

export default React.memo(Experience, (prev, next) =>
	isEqual(prev.experience, next.experience)
);
