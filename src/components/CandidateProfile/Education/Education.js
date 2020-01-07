/* Education.js */
import React, { useState, useEffect } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateEducationContainer from "./CandidateEducationContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";
import { isEqual } from "lodash";

const EducationDiv = ({ education, candId, handleEducationChange }) => {
	return (
		<section>
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

	React.useEffect(() => {
		console.log("***  Education rendered ***");
	});

	useEffect(() => {
		setEducation(objCopy(props.education));
	}, [props.education]);

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Education"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandEducationDiv = makeExpansion(
		EducationDiv,
		header,
		null,
		false,
		0
	);

	return (
		<section className="Education profile-section">
			<ExpandEducationDiv education={education} candId={props.candId} />
		</section>
	);
};

export default React.memo(Education, (prev, next) =>
	isEqual(prev.education, next.education)
);
