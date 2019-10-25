import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import dataFetch from "../../../assets/js/dataFetch";
import makeExpansion from "styledComponents/makeExpansion";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const API_CANDIDATES = "candidates/";
const API_OBJECTIVE = "/objective";

const ObjectiveSummaryDiv = ({
	objective,
	executiveSummary,
	handleSubmit,
	toast,
	closeToast
}) => {
	return (
		<section>
			<FormsProvider>
				<ObjectiveSummaryForm
					formData={{ objective, executiveSummary }}
					handleSubmit={handleSubmit}
				/>
			</FormsProvider>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					closeCallBk={closeToast}
				/>
			)}
		</section>
	);
};

const header = () => {
	return (
		<ProfileSectionHeader
			headerTitle="Objective / Executive Summary"
			profilePercentage="15"
			profileSectionCompleted={false}
		/>
	);
};

const ExpandObjectiveDiv = makeExpansion(ObjectiveSummaryDiv, header);

const ObjectiveSummary = ({ objective, executiveSummary, candId }) => {
	const [toast, setToast] = useState({});
	const [candObjective, setCandObjective] = useState(objective);
	const [candSummary, setCandSummary] = useState(executiveSummary);

	useEffect(() => {
		setCandObjective(objective);
		setCandSummary(executiveSummary);
	}, [objective, executiveSummary]);

	const handleSubmit = formData => {
		console.log("handleSubmit formData: ", formData);
		//const { objective, executiveSummary } = formData;
		postObjective(formData);
		// handleUpdate({
		// 	objective,
		// 	executiveSummary
		// });
	};

	const postObjective = async ({ objective, executiveSummary }) => {
		closeToast();
		let body = {
			objective,
			executiveSummary
		};
		const id = candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_OBJECTIVE}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result.error);
			addToast("An unknown error occurred", "Close", false);
		} else {
			setCandObjective(objective);
			setCandSummary(executiveSummary);
			const userMsg = "Objective / Executive Summary has been updated";
			addToast(userMsg);
		}
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	return (
		<section className="tsd-card objective-summary profile-section">
			<ExpandObjectiveDiv
				objective={candObjective}
				executiveSummary={candSummary}
				handleSubmit={handleSubmit}
				toast={toast}
				closeToast={closeToast}
			/>
		</section>
	);
};

export default ObjectiveSummary;
