import React, { useState, useEffect } from "react";
import HighlightsFormContainer from "../highlights/HighlightsFormContainer";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject, objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_HIGHLIGHTS = "/highlights";

const HighlightsContainer = (props) => {
	const [highlights, setHighlights] = useState(objCopy(props.highlights));
	const [toast, setToast] = useState({});

	useEffect(() => {
		setHighlights(objCopy(props.highlights));
	}, [props.highlights]);

	const handleSubmit = async (highlights) => {
		// api update and then pass new data up
		postHighlights(highlights);
	};

	const addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const postHighlights = async (newHighlights) => {
		closeToast();
		let body = {
			highlights: newHighlights,
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_HIGHLIGHTS}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
			addToast("An unknown error has occurred", "Close", false);
		} else {
			props.handleSubmit(newHighlights);
			addToast("Highlights have been updated");
		}
	};

	const handleHighlightChange = (highlights) => {
		setHighlights(highlights);
		// any changes are automatically saved to ease data entry
		handleSubmit(highlights);
	};

	return (
		<section>
			<HighlightsFormContainer
				highlights={highlights}
				handleHighlightChange={handleHighlightChange}
				includeInSummary={false}
				heading={false}
				candId={props.candId}
				setShowSkills={props.setShowSkills}
				profileFlag={true}
				handleSubmit={handleSubmit}
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

export default HighlightsContainer;
