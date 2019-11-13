import React, { useState, useEffect } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateExperienceContainer from "./CandidateExperienceContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";

const ExperienceDiv = ({ experience, candId, handleExperienceChange }) => {
	return (
		<section>
			<CandidateExperienceContainer
				experience={experience}
				candId={candId}
				handleExperienceChange={handleExperienceChange}
			/>
		</section>
	);
};

const Experience = props => {
	const [experience, setExperience] = useState(objCopy(props.experience));

	useEffect(() => {
		setExperience(objCopy(props.experience));
	}, [props.experience]);

	const handleExperienceChange = experience => {
		props.handleUpdate({
			experience
		});
	};

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Candidate Experience"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandExperienceDiv = makeExpansion(ExperienceDiv, header);

	return (
		<section className="tsd-card Experience profile-section">
			<ExpandExperienceDiv
				experience={experience}
				candId={props.candId}
				handleExperienceChange={handleExperienceChange}
			/>
		</section>
	);
};

export default Experience;
