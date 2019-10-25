import React, { useState, useEffect } from "react";

import CandidateEducation from "./CandidateEducation";
import { objCopy } from "../../../../assets/js/library";
import "./css/candidateEducation.css";
import dataFetch from "../../../../assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_EDUCATION = "/education";

const CandidateEducationContainer = props => {
	const [editNdx, setEditNdx] = useState(false);
	const [sortEducation, setSortEducation] = useState(
		props.education
			? objCopy(props.education).sort((a, b) => a.startDate - b.startDate)
			: []
	);

	const emptyEducation = {
		id: "",
		candidateId: props.candId || "",
		schoolName: "",
		schoolMunicipality: "",
		schoolRegion: "",
		schoolCountry: "",
		degreeName: "",
		degreeType: "",
		degreeMajor: "",
		degreeMinor: "",
		startDate: "",
		endDate: "",
		skills: []
	};

	useEffect(() => {
		setSortEducation(
			props.education
				? objCopy(props.education).sort((a, b) => a.startDate - b.startDate)
				: []
		);
	}, [props.education]);

	const updateEducation = async education => {
		let body = {
			education
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_EDUCATION}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
		} else {
			// need user message here
			props.handleEducationChange(result);
		}
	};

	const handleDelEducation = ndx => {
		/**
		 *
		 * must have warning here!!!
		 *
		 *
		 *
		 */
		const tmp = objCopy(sortEducation.slice());
		tmp.splice(ndx, 1);
		updateEducation(tmp);
	};

	const handleDispEditModal = ndx => {
		setEditNdx(ndx);
	};

	const handleCloseModal = () => {
		setEditNdx(false);
	};

	const handleSave = ed => {
		const tmp = objCopy(sortEducation.slice());
		tmp[editNdx] = ed;
		updateEducation(tmp);
		handleCloseModal();
	};

	const handleAddNewEducation = () => {
		// add empty job to list if not already empty
		// set editNdx to this new element
		sortEducation.push(emptyEducation);
		setEditNdx(sortEducation.length - 1);
	};

	const handleCancel = () => {
		setEditNdx(false);
	};

	const actions = {
		delete: handleDelEducation,
		edit: handleDispEditModal
	};

	return (
		<CandidateEducation
			sortEducation={sortEducation}
			actions={actions}
			editNdx={editNdx}
			handleAddNewEducation={handleAddNewEducation}
			handleSave={handleSave}
			handleCancel={handleCancel}
			candId={props.candId}
		/>
	);
};

export default CandidateEducationContainer;
