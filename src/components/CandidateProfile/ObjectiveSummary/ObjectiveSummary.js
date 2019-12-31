/* ObjectiveSummary.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryContainer from "./ObjectiveSummaryContainer";
import makeExpansion from "styledComponents/makeExpansion";

const ObjectiveSummaryDiv = ({
	jobTitle,
	objective,
	executiveSummary,
	candId
}) => {
	return (
		<section>
			<ObjectiveSummaryContainer
				jobTitle={jobTitle}
				objective={objective}
				executiveSummary={executiveSummary}
				candId={candId}
			/>
		</section>
	);
};

const ObjectiveSummary = ({
	jobTitle,
	objective,
	executiveSummary,
	candId,
	compObj
}) => {
	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Professional Info"
				profilePercentage={compObj.curPct + " / " + compObj.availPct}
				profileSectionCompleted={compObj.curPct === compObj.availPct}
			/>
		);
	};

	const ExpandObjectiveDiv = makeExpansion(
		ObjectiveSummaryDiv,
		header,
		null,
		false,
		0
	);

	return (
		<section className="objective-summary profile-section">
			<ExpandObjectiveDiv
				jobTitle={jobTitle}
				objective={objective}
				executiveSummary={executiveSummary}
				candId={candId}
			/>
		</section>
	);
};

export default ObjectiveSummary;
