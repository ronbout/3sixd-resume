/* CandidateCertificationsContainer.js */
import React, { useState, useEffect } from "react";
import CandidateCertifications from "./CandidateCertifications";
import Snackbar from "styledComponents/Snackbar";
import Button from "styledComponents/Button";
import DialogContainer from "styledComponents/DialogContainer";
import { isEmptyObject, objCopy } from "assets/js/library";
import "./css/candidateCertifications.css";
import dataFetch from "assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_CERTIFICATIONS = "/certifications";

const CandidateCertificationsContainer = props => {
	const [delNdx, setDelNdx] = useState(-1);
	const [editNdx, setEditNdx] = useState(false);
	const [certifications, setCertifications] = useState(
		props.certifications ? objCopy(props.certifications) : []
	);
	const [toast, setToast] = useState({});

	const emptyCertification = {
		id: "",
		candidateId: props.candId || "",
		name: "",
		description: "",
		issueDate: "",
		certificateImage: "",
		skills: []
	};

	useEffect(() => {
		setCertifications(
			props.certifications ? objCopy(props.certifications) : []
		);
	}, [props.certifications]);

	const addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const updateCertifications = async certifications => {
		closeToast();
		let body = {
			certifications
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_CERTIFICATIONS}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log("fetch error: ", result);
			addToast("An unknown error has occurred", "Close", false);
			handleCancel();
		} else {
			addToast("Certifications have been updated");
			setCertifications(certifications ? objCopy(certifications) : []);
			props.handleSubmit(certifications);
		}
	};

	const handleDelCertification = ndx => {
		setDelNdx(ndx);
	};

	const hideDelDialog = () => {
		setDelNdx(-1);
	};

	const confirmedDelete = () => {
		const tmp = objCopy(certifications.slice());
		tmp.splice(delNdx, 1);
		console.log("deleted certifications, if turned on: ", tmp);
		updateCertifications(tmp);
		//alert("not actually deleting certifications until later in testing");
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

	const handleSave = ed => {
		const tmp = objCopy(certifications.slice());
		tmp[editNdx] = ed;
		updateCertifications(tmp);
		handleCloseModal();
	};

	const handleAddNewCertification = () => {
		// add empty job to list if not already empty
		// set editNdx to this new element
		certifications.push(emptyCertification);
		setEditNdx(certifications.length - 1);
	};

	const handleCancel = () => {
		setEditNdx(false);
		setCertifications(
			props.certifications ? objCopy(props.certifications) : []
		);
	};

	const actions = {
		delete: handleDelCertification,
		edit: handleDispEditModal,
		image: () => alert("display image")
	};

	return (
		<React.Fragment>
			<CandidateCertifications
				certifications={certifications}
				actions={actions}
				editNdx={editNdx}
				handleAddNewCertification={handleAddNewCertification}
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
					{certifications.length && delNdx !== -1
						? `${certifications[delNdx].name} - ${certifications[delNdx].description}`
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

export default CandidateCertificationsContainer;
