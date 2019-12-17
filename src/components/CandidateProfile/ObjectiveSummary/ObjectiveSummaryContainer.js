/* ObjectiveSummaryContainer.js */
import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import dataFetch from "assets/js/dataFetch";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const API_CANDIDATES = "candidates/";
const API_OBJECTIVE = "/objective";

const ObjectiveSummaryContainer = ({
	jobTitle,
	objective,
	executiveSummary,
	candId
}) => {
	const [toast, setToast] = useState({});
	const [candJobTitle, setCandJobTitle] = useState(jobTitle);
	const [candObjective, setCandObjective] = useState(objective);
	const [candSummary, setCandSummary] = useState(executiveSummary);

	useEffect(() => {
		setCandJobTitle(jobTitle);
		setCandObjective(objective);
		setCandSummary(executiveSummary);
	}, [jobTitle, objective, executiveSummary]);

	const handleSubmit = formData => {
		postObjective(formData);
	};

	const postObjective = async ({ jobTitle, objective, executiveSummary }) => {
		closeToast();
		let body = {
			jobTitle,
			objective,
			executiveSummary
		};
		const id = candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_OBJECTIVE}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
			addToast("An unknown error occurred", "Close", false);
		} else {
			setCandObjective(objective);
			setCandSummary(executiveSummary);
			const userMsg = "Job Title / Objective / Summary has been updated";
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
		<section>
			<FormsProvider>
				<ObjectiveSummaryForm
					formData={{
						jobTitle: candJobTitle,
						objective: candObjective,
						executiveSummary: candSummary
					}}
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

export default ObjectiveSummaryContainer;
