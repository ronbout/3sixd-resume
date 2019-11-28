/* CandidateEducationCrud.js */
import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import CandidateEducationCrudForm from "./CandidateEducationCrudForm";
import { objCopy } from "../../../assets/js/library";

const CandidateEducationCrud = props => {
	//const [origEducation, setOrigEducation] = useState(null);
	const [education, setEducation] = useState(objCopy(props.education));

	useEffect(() => {
		setEducation(objCopy(props.education));
	}, [props.education]);

	const handleSkillsChange = skills => {
		setEducation(prevEd => ({
			...prevEd,
			skills
		}));
	};

	const handleSave = education => {
		props.handleSave && props.handleSave(education);
	};

	const handleCancel = () => {
		props.handleCancel();
	};

	return (
		<FormsProvider>
			<CandidateEducationCrudForm
				education={education}
				handleSkillsChange={handleSkillsChange}
				handleSave={handleSave}
				handleCancel={handleCancel}
				candId={props.candId}
			/>
		</FormsProvider>
	);
};

export default CandidateEducationCrud;
