/* Experience.js */
import React, { useState, useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateExperienceContainer from "./CandidateExperienceContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { objCopy } from "assets/js/library";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const ExperienceDiv = ({ experience, candId, handleUpdate }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = experience => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { experience }
		});
		handleUpdate(experience);
	};

	return (
		<section>
			<CandidateExperienceContainer
				experience={experience}
				candId={candId}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

const header = () => {
	return (
		<ProfileSectionHeader
			headerTitle="Experience"
			profilePercentage="20"
			profileSectionCompleted={true}
		/>
	);
};

// const onExpansionToggle = toggleState => {
// 	setExpanded(toggleState);
// };

const ExpandExperienceDiv = makeExpansion(
	ExperienceDiv,
	header,
	null,
	false,
	0
);

const Experience = ({ experience, candId }) => {
	const [toast, setToast] = useState({});
	// const [expanded, setExpanded] = useState(false);
	const [formData, setFormData] = useState({ experience: objCopy(experience) });
	// React.useEffect(() => {
	// 	console.log("***  Highlights rendered ***");
	// });

	const handleUpdate = experience => {
		closeToast();
		// setExpanded(true);
		setFormData({ experience });
		const userMsg = "Experience has been updated";
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
		<section className="Experience profile-section">
			<ExpandExperienceDiv
				experience={formData.experience}
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

export default React.memo(Experience, (prev, next) =>
	isEqual(prev.experience, next.experience)
);
