/* ObjectiveSummary.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryContainer from "./ObjectiveSummaryContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { isEqual } from "lodash";

const ObjectiveSummaryDiv = ({
	jobTitle,
	objective,
	executiveSummary,
	candId,
	handleUpdate
}) => {
	const handleSubmit = ({ jobTitle, objective, executiveSummary }) => {
		handleUpdate({ jobTitle, objective, executiveSummary });
	};

	return (
		<section>
			<ObjectiveSummaryContainer
				jobTitle={jobTitle}
				objective={objective}
				executiveSummary={executiveSummary}
				candId={candId}
				handleUpdate={handleSubmit}
			/>
		</section>
	);
};

const ObjectiveSummary = ({
	jobTitle,
	objective,
	executiveSummary,
	candId,
	handleUpdate
}) => {
	// React.useEffect(() => {
	// 	console.log("***  Objective Summary rendered ***");
	// });

	const header = () => {
		return <ProfileSectionHeader headerTitle="Professional Info" />;
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
				handleUpdate={handleUpdate}
			/>
		</section>
	);
};

export default React.memo(ObjectiveSummary, (prev, next) => {
	return (
		isEqual(prev.jobTitle, next.jobTitle) &&
		isEqual(prev.objective, next.objective) &&
		isEqual(prev.executiveSummary, next.executiveSummary)
	);
});
