import React from "react";
import { FormsProvider } from "components/forms/FormsContext";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import dataFetch from "../../../assets/js/dataFetch";
import makeExpansion from "styledComponents/makeExpansion";

const API_CANDIDATES = "candidates/";
const API_OBJECTIVE = "/objective";

const ObjectiveSummaryDiv = ({ objective, executiveSummary, handleSubmit }) => {
	return (
		<section className="tsd-card personal-info profile-section">
			<FormsProvider>
				<ObjectiveSummaryForm
					formData={{ objective, executiveSummary }}
					handleSubmit={handleSubmit}
				/>
			</FormsProvider>
		</section>
	);
};

const ObjectiveSummary = ({
	objective,
	executiveSummary,
	handleUpdate,
	candId
}) => {
	const handleSubmit = formData => {
		const { objective, executiveSummary } = formData;
		postObjective(formData);
		handleUpdate({
			objective,
			executiveSummary
		});
	};

	const postObjective = async ({ objective, executiveSummary }) => {
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
		} else {
			// need user message here
		}
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

	return (
		<section className="tsd-card objective-summary profile-section">
			<ExpandObjectiveDiv
				objective={objective}
				executiveSummary={executiveSummary}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

export default ObjectiveSummary;
