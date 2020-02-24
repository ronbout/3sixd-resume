import React, { useState, useEffect } from "react";
import HighlightsFormContainer from "../highlights/HighlightsFormContainer";
import DirtyModalMsg from "components/forms/DirtyModalMsg";
import HighlightsFooter from "./HighlightsFooter";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject, objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
import { isEqual } from "lodash";

const API_CANDIDATES = "candidates/";
const API_HIGHLIGHTS = "/highlights";

const HighlightsContainer = props => {
	const [highlights, setHighlights] = useState(objCopy(props.highlights));
	const [origHighlights, setOrigHighlights] = useState(
		objCopy(props.highlights)
	);
	const [dispDirtyMsg, setDispDirtyMsg] = useState(false);
	const [toast, setToast] = useState({});

	useEffect(() => {
		setHighlights(objCopy(props.highlights));
		setOrigHighlights(objCopy(props.highlights));
	}, [props.highlights]);

	const handleSubmit = async event => {
		event && event.preventDefault();
		// api update and then pass new data up
		postHighlights();
	};

	const handleCancel = () => {
		setDispDirtyMsg(true);
	};

	const handleConfirmCancel = () => {
		setDispDirtyMsg(false);
		props.handleSubmit(origHighlights);
	};

	const addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const postHighlights = async () => {
		closeToast();
		let body = {
			highlights
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_HIGHLIGHTS}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
			addToast("An unknown error has occurred", "Close", false);
		} else {
			// need user message here
			// setOrigHighlights(highlights);
			// addToast("Highlights have been updated");
			props.handleSubmit(highlights);
		}
	};

	const handleHighlightChange = highlights => {
		setHighlights(highlights);
	};

	return (
		<section>
			<HighlightsFormContainer
				highlights={highlights}
				handleHighlightChange={handleHighlightChange}
				includeInSummary={false}
				heading={false}
				candId={props.candId}
			/>
			<HighlightsFooter
				disableSubmit={isEqual(origHighlights, highlights)}
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
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
			{dispDirtyMsg && (
				<DirtyModalMsg
					dirtyMsgString="cancel Highlight changes"
					yesAction={handleConfirmCancel}
					closeModal={() => setDispDirtyMsg(false)}
				/>
			)}
		</section>
	);
};

export default HighlightsContainer;
