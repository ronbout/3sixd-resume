/* ObjectiveSummary.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryContainer from "./ObjectiveSummaryContainer";
import makeExpansion from "styledComponents/makeExpansion";

const ObjectiveSummaryDiv = ({ objective, executiveSummary, candId }) => {
	return (
		<section>
			<ObjectiveSummaryContainer
				objective={objective}
				executiveSummary={executiveSummary}
				candId={candId}
			/>
		</section>
	);
};

const ObjectiveSummary = ({ objective, executiveSummary, candId }) => {
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
				candId={candId}
			/>
		</section>
	);
};

export default ObjectiveSummary;
