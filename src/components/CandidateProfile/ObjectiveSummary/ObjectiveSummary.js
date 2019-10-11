import React, { useState, useLayoutEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import ObjectiveSummaryFooter from "./ObjectiveSummaryFooter";
import dataFetch from "../../../assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_OBJECTIVE = "/objective";

const ObjectiveSummary = ({
	objective,
	executiveSummary,
	handleUpdate,
	candId
}) => {
	const [sliderOpen, setSliderOpen] = useState(true);
	const [divStyle, setDivStyle] = useState({ display: "none" });

	const handleSlider = () => {
		setSliderOpen(!sliderOpen);
	};

	useLayoutEffect(() => {
		setDivStyle({ height: sliderOpen ? "390px" : "0" });
	}, [sliderOpen]);

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

	return (
		<section className="tsd-card objective-summary profile-section">
			<ProfileSectionHeader
				headerTitle="Objective / Executive Summary"
				profilePercentage="15"
				profileSectionCompleted={false}
				slider="arrow-down"
				handleSlider={handleSlider}
			/>
			<div className="slide-section" style={divStyle}>
				<FormsProvider>
					<ObjectiveSummaryForm
						formData={{ objective, executiveSummary }}
						handleSubmit={handleSubmit}
					/>
					<ObjectiveSummaryFooter />
				</FormsProvider>
			</div>
		</section>
	);
};

export default ObjectiveSummary;
