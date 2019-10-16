import React, { useState, useEffect } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "../../CandidateSetup/formSections/HighlightsContainer";
import HighlightsFooter from "./HighlightsFooter";
import { objCopy } from "../../../assets/js/library.js";
import dataFetch from "../../../assets/js/dataFetch";
import makeExpansion from "styledComponents/makeExpansion";

const API_CANDIDATES = "candidates/";
const API_HIGHLIGHTS = "/highlights";

const HighlightsDiv = ({
	highlights,
	handleHighlightChange,
	candId,
	handleSubmit
}) => {
	return (
		<section className="tsd-card highlights profile-section">
			<HighlightsContainer
				highlights={highlights}
				handleHighlightChange={handleHighlightChange}
				includeInSummary={false}
				heading={false}
				candId={candId}
			/>
			<HighlightsFooter handleSubmit={handleSubmit} />
		</section>
	);
};

const Highlights = props => {
	const [highlights, setHighlights] = useState(objCopy(props.highlights));

	useEffect(() => {
		setHighlights(objCopy(props.highlights));
	}, [props.highlights]);

	const handleSubmit = async event => {
		event && event.preventDefault();
		console.log("Highlights api update goes here");
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
			console.log(result.error);
		} else {
			// need user message here
			props.handleUpdate({
				candidateHighlights: result
			});
		}
	};

	const handleHighlightChange = highlights => {
		console.log("handle change: ", highlights);
		setHighlights(highlights);
	};

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Candidate Highlights"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandHighlightDiv = makeExpansion(HighlightsDiv, header);

	return (
		<section className="tsd-card highlights profile-section">
			<ExpandHighlightDiv
				highlights={highlights}
				handleHighlightChange={handleHighlightChange}
				candId={props.candId}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

export default Highlights;
