import React, { useState, useEffect } from "react";
import HighlightsFormContainer from "../highlights/HighlightsFormContainer";
import HighlightsFooter from "./HighlightsFooter";
import { objCopy } from "../../../assets/js/library.js";
import dataFetch from "../../../assets/js/dataFetch";
import { isEqual } from "lodash";

const API_CANDIDATES = "candidates/";
const API_HIGHLIGHTS = "/highlights";

const HighlightsContainer = props => {
	const [highlights, setHighlights] = useState(objCopy(props.highlights));
	const [origHighlights, setOrigHighlights] = useState(
		objCopy(props.highlights)
	);

	useEffect(() => {
		setHighlights(objCopy(props.highlights));
		setOrigHighlights(objCopy(props.highlights));
	}, [props.highlights]);

	const handleSubmit = async event => {
		event && event.preventDefault();
		// api update and then pass new data up
		postHighlights();
	};

	const postHighlights = async () => {
		let body = {
			highlights
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_HIGHLIGHTS}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
		} else {
			// need user message here
			setOrigHighlights(highlights);
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
			/>
		</section>
	);
};

export default HighlightsContainer;
