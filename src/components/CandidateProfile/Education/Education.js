/* Education.js */
import React, { useState, useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateEducationContainer from "./CandidateEducationContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const EducationDiv = ({ education, candId, handleUpdate }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = education => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { education }
		});
		handleUpdate(education);
	};

	return (
		<section>
			<CandidateEducationContainer
				education={education}
				candId={candId}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

const header = () => {
	return (
		<ProfileSectionHeader
			headerTitle="Education"
			profilePercentage="20"
			profileSectionCompleted={true}
		/>
	);
};

// const onExpansionToggle = toggleState => {
// 	setExpanded(toggleState);
// };

const ExpandEducationDiv = makeExpansion(EducationDiv, header, null, false, 0);

const Education = ({ education, candId }) => {
	const [toast, setToast] = useState({});
	// const [expanded, setExpanded] = useState(false);
	const [formData, setFormData] = useState({ education: objCopy(education) });
	// React.useEffect(() => {
	// 	console.log("***  Highlights rendered ***");
	// });

	const handleUpdate = education => {
		closeToast();
		// setExpanded(true);
		setFormData({ education });
		const userMsg = "Education has been updated";
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
		<section className="Education profile-section">
			<ExpandEducationDiv
				education={formData.education}
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

export default React.memo(Education, (prev, next) =>
	isEqual(prev.education, next.education)
);
