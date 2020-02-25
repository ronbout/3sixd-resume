/* ObjectiveSummary.js */
import React, { useContext, useState } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryContainer from "./ObjectiveSummaryContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const ObjectiveSummaryDiv = ({
	jobTitle,
	objective,
	executiveSummary,
	candId,
	handleUpdate
}) => {
	const { dispatch } = useContext(CompObjContext);
	const handleSubmit = ({ jobTitle, objective, executiveSummary }) => {
		// instead of passing info up, use dispatch
		dispatch({
			type: "UPDATE_CAND",
			payload: { jobTitle, objective, executiveSummary }
		});
		handleUpdate(jobTitle, objective, executiveSummary);
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

const header = () => {
	return <ProfileSectionHeader headerTitle="Professional Info" />;
};

// const onExpansionToggle = toggleState => {
// 	setExpanded(toggleState);
// };

const ExpandObjectiveDiv = makeExpansion(
	ObjectiveSummaryDiv,
	header,
	null,
	false,
	0
);

const ObjectiveSummary = ({
	jobTitle,
	objective,
	executiveSummary,
	candId
}) => {
	const [toast, setToast] = useState({});
	// const [expanded, setExpanded] = useState(false);

	const [formData, setFormData] = useState({
		jobTitle,
		objective,
		executiveSummary
	});

	const handleUpdate = (jobTitle, objective, executiveSummary) => {
		closeToast();
		// setExpanded(true);
		setFormData({ jobTitle, objective, executiveSummary });
		const userMsg = "Professional Info has been updated";
		addToast(userMsg);
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	return (
		<section className="objective-summary profile-section">
			<ExpandObjectiveDiv
				jobTitle={formData.jobTitle}
				objective={formData.objective}
				executiveSummary={formData.executiveSummary}
				candId={candId}
				handleUpdate={handleUpdate}
			/>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					onDismiss={closeToast}
				/>
			)}
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
