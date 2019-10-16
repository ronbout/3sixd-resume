import React, { useState, useEffect } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateEducationContainer from "../../CandidateSetup/formSections/CandidateEducation/";
import { objCopy } from "../../../assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";

const EducationDiv = ({ education, candId, handleEducationChange }) => {
	return (
		<section className="tsd-card Education profile-section">
			<CandidateEducationContainer
				education={education}
				candId={candId}
				handleEducationChange={handleEducationChange}
			/>
		</section>
	);
};

const Education = props => {
	const [education, setEducation] = useState(objCopy(props.education));

	useEffect(() => {
		setEducation(objCopy(props.education));
	}, [props.education]);

	const handleEducationChange = education => {
		props.handleUpdate({
			education
		});
	};

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Candidate Education"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandEducationDiv = makeExpansion(EducationDiv, header);

	return (
		<section className="tsd-card Education profile-section">
			<ExpandEducationDiv
				education={education}
				candId={props.candId}
				handleEducationChange={handleEducationChange}
			/>
		</section>
	);
};

export default Education;
