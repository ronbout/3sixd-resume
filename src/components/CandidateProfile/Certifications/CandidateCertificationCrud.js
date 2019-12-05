/* CandidateCertificationCrud.js */
import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import CandidateCertificationCrudForm from "./CandidateCertificationCrudForm";
import { objCopy } from "assets/js/library";

const CandidateCertificationCrud = props => {
	//const [origEducation, setOrigEducation] = useState(null);
	const [certification, setCertification] = useState(
		objCopy(props.certification)
	);

	useEffect(() => {
		setCertification(objCopy(props.certification));
	}, [props.certification]);

	const handleSkillsChange = skills => {
		setCertification(prevCert => ({
			...prevCert,
			skills
		}));
	};

	const handleSave = certification => {
		props.handleSave && props.handleSave(certification);
	};

	const handleCancel = () => {
		props.handleCancel();
	};

	return (
		<FormsProvider>
			<CandidateCertificationCrudForm
				certification={certification}
				handleSkillsChange={handleSkillsChange}
				handleSave={handleSave}
				handleCancel={handleCancel}
				candId={props.candId}
			/>
		</FormsProvider>
	);
};

export default CandidateCertificationCrud;
