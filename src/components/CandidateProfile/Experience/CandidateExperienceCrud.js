/* CandidateExperienceCrud.js */
import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import CandidateExperienceCrudForm from "./CandidateExperienceCrudForm";
import { objCopy } from "assets/js/library";
import { fetchCompany, fetchPerson } from "assets/js/dataFetch";

const CandidateExperienceCrud = props => {
	//const [origJob, setOrigJob] = useState(objCopy(props.experience));
	const [showCompany, setShowCompany] = useState(false);
	const [showPerson, setShowPerson] = useState(false);
	const [job, setJob] = useState(objCopy(props.experience));

	let fetchCompanyFlag = false;
	let fetchPersonFlag = false;

	useEffect(() => {
		setJob(objCopy(props.experience));
		//setOrigJob(objCopy(props.experience));
	}, [props.experience]);

	const handleContactChange = event => {
		// not going to allow change through the
		// input field.  Must use popup
		return;
	};

	const handleCompanyClick = async event => {
		// do not open if Person is already open
		if (showPerson && !showCompany) return;
		// if we are opening this for the first time, we need
		// to fetch the full company info
		if (!fetchCompanyFlag) {
			fetchCompanyFlag = true;
			if (job.company.id) {
				let companyInfo = await fetchCompany(job.company.id);
				setJob(origJob => {
					return {
						...origJob,
						company: companyInfo
					};
				});
			}
		}
		setShowCompany(true);
	};

	const handlePersonClick = async event => {
		// do not open if Company is already open
		if (showCompany && !showPerson) return;
		// if we are opening this for the first time, we need
		// to fetch the full company info
		if (!fetchPersonFlag) {
			fetchPersonFlag = true;
			if (job.contactPerson.id) {
				let contactPersonInfo = await fetchPerson(job.contactPerson.id);
				setJob(origJob => {
					return {
						...origJob,
						contactPerson: contactPersonInfo
					};
				});
			}
		}
		setShowPerson(true);
	};

	const handleSkillsChange = skills => {
		setJob(prevJob => ({
			...prevJob,
			skills
		}));
	};

	const handleSave = job => {
		props.handleSave && props.handleSave(job);
	};

	const handleCancel = () => {
		setShowCompany(false);
		props.handleCancel();
	};

	const handleCompanyCancel = () => {
		setShowCompany(false);
		fetchCompanyFlag = false;
	};

	const handleCompanySubmit = () => {
		setShowCompany(false);
		fetchCompanyFlag = false;
	};

	const handlePersonCancel = () => {
		setShowPerson(false);
		fetchPersonFlag = false;
	};

	const handlePersonSubmit = personInfo => {
		setShowPerson(false);
		fetchPersonFlag = false;
	};

	return (
		<FormsProvider>
			<CandidateExperienceCrudForm
				job={job}
				showPerson={showPerson}
				showCompany={showCompany}
				handleCompanyClick={handleCompanyClick}
				handlePersonClick={handlePersonClick}
				handleContactChange={handleContactChange}
				handleSkillsChange={handleSkillsChange}
				handleSave={handleSave}
				handleCancel={handleCancel}
				handlePersonCancel={handlePersonCancel}
				handlePersonSubmit={handlePersonSubmit}
				handleCompanyCancel={handleCompanyCancel}
				handleCompanySubmit={handleCompanySubmit}
				candId={props.candId}
			/>
		</FormsProvider>
	);
};

export default CandidateExperienceCrud;
