/* CandidateExperienceContainer.js */
import React, { useState, useEffect } from "react";
import CandidateExperience from "./CandidateExperience";
import Snackbar from "styledComponents/Snackbar";
import Button from "styledComponents/Button";
import DialogContainer from "styledComponents/DialogContainer";
import "./css/candidateExperience.css";
import { isEmptyObject, objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_EXPERIENCE = "/experience";

const CandidateExperienceContainer = props => {
	const [delNdx, setDelNdx] = useState(-1);
	const [editNdx, setEditNdx] = useState(false);
	const [sortJobs, setSortJobs] = useState(
		props.experience
			? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
			: []
	);
	const [toast, setToast] = useState({});

	const emptyExperience = {
		id: "",
		candidateId: props.candId || "",
		company: {
			id: "",
			name: "",
			description: "",
			municipality: "",
			region: "",
			countryCode: ""
		},
		startDate: "",
		endDate: "",
		contactPerson: {
			id: "",
			formattedName: "",
			givenName: "",
			familyName: "",
			mobilePhone: "",
			workPhone: "",
			addressLine1: "",
			addressLine2: "",
			municipality: "",
			region: "",
			postalCode: "",
			countryCode: "",
			email1: "",
			website: ""
		},
		payType: "Salary",
		startPay: "",
		endPay: "",
		jobTitleId: "",
		jobTitle: "",
		summary: "",
		skills: [],
		highlights: []
	};

	useEffect(() => {
		setSortJobs(
			props.experience
				? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
				: []
		);
	}, [props.experience]);

	const addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const updateExperience = async experiences => {
		closeToast();
		let body = {
			experience: objCopy(experiences).map(exp => {
				const contactPersonId = exp.contactPerson ? exp.contactPerson.id : "";
				const companyId = exp.company ? exp.company.id : "";
				return {
					...exp,
					contactPersonId,
					companyId
				};
			})
		};

		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_EXPERIENCE}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log("fetch error: ", result);
			addToast("An unknown error has occurred", "Close", false);
			handleCancel();
		} else {
			addToast("Experience has been updated");

			setSortJobs(
				experiences ? experiences.sort((a, b) => a.startDate - b.startDate) : []
			);
			props.handleSubmit(experiences);
		}
	};

	const handleDelExperience = ndx => {
		setDelNdx(ndx);
	};

	const hideDelDialog = () => {
		setDelNdx(-1);
	};

	const confirmedDelete = () => {
		const tmp = objCopy(sortJobs.slice());
		tmp.splice(delNdx, 1);
		console.log("deleted experience, if turned on: ", tmp);
		updateExperience(tmp);
		//alert("not actually deleting experience until later in testing");
		hideDelDialog();
	};

	const delDialogActions = [
		{ secondary: true, children: "Cancel", onClick: hideDelDialog },
		<Button
			className="btn btn-danger"
			variant="flat"
			color="primary"
			onClick={confirmedDelete}
		>
			Delete
		</Button>
	];

	const handleDispEditModal = ndx => {
		setEditNdx(ndx);
	};

	const handleCloseModal = () => {
		setEditNdx(false);
	};

	const handleSave = exp => {
		const tmp = sortJobs.slice();
		tmp[editNdx] = exp;
		updateExperience(tmp);
		handleCloseModal();
	};

	const handleAddNewJob = () => {
		// add empty job to list if not already empty
		// set editNdx to this new element
		sortJobs.push(emptyExperience);
		setEditNdx(sortJobs.length - 1);
	};

	const handleCancel = () => {
		setEditNdx(false);
		setSortJobs(
			props.experience
				? objCopy(props.experience).sort((a, b) => a.startDate - b.startDate)
				: []
		);
	};

	const actions = {
		delete: handleDelExperience,
		edit: handleDispEditModal
	};

	return (
		<React.Fragment>
			<CandidateExperience
				sortJobs={sortJobs}
				actions={actions}
				editNdx={editNdx}
				handleAddNewJob={handleAddNewJob}
				handleSave={handleSave}
				handleCancel={handleCancel}
				candId={props.candId}
			/>
			<DialogContainer
				id="delete-dialog"
				visible={delNdx >= 0}
				onHide={hideDelDialog}
				title="Delete Highlight"
				actions={delDialogActions}
			>
				<p>
					You are going to delete &nbsp;
					{sortJobs.length && delNdx !== -1
						? `${sortJobs[delNdx].jobTitle} - ${sortJobs[delNdx].company.name}`
						: ""}
					.
				</p>
				Are you sure?
			</DialogContainer>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					closeCallBk={closeToast}
				/>
			)}
		</React.Fragment>
	);
};

export default CandidateExperienceContainer;
