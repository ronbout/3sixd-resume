/* Highlights.js */
import React, { useContext, useState } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "./HighlightsContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { objCopy } from "assets/js/library";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const HighlightsDiv = ({ highlights, candId, handleUpdate }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = highlights => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { candidateHighlights: highlights }
		});
		handleUpdate(highlights);
	};

	return (
		<section>
			<HighlightsContainer
				highlights={highlights}
				candId={candId}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

const Highlights = ({ highlights, candId }) => {
	const [toast, setToast] = useState({});
	const [expanded, setExpanded] = useState(false);
	const [formData, setFormData] = useState({ highlights: objCopy(highlights) });
	// React.useEffect(() => {
	// 	console.log("***  Highlights rendered ***");
	// });

	const handleUpdate = highlights => {
		closeToast();
		setExpanded(true);
		setFormData({ highlights });
		const userMsg = "Highlights have been updated";
		!isEqual(highlights, formData.highlights) && addToast(userMsg);
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Career Highlights"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const onExpansionToggle = toggleState => {
		setExpanded(toggleState);
	};

	const ExpandHighlightDiv = makeExpansion(
		HighlightsDiv,
		header,
		null,
		expanded,
		0,
		onExpansionToggle
	);

	return (
		<section className="highlights profile-section">
			<ExpandHighlightDiv
				highlights={formData.highlights}
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

export default React.memo(Highlights, (prev, next) =>
	isEqual(prev.highlights, next.highlights)
);
