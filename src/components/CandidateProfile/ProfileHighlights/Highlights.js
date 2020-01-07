/* Highlights.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "./HighlightsContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { isEqual } from "lodash";

const HighlightsDiv = ({ highlights, candId, handleUpdate }) => {
	const handleSubmit = highlights => {
		handleUpdate({ candidateHighlights: highlights });
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

const Highlights = ({ highlights, candId, handleUpdate }) => {
	React.useEffect(() => {
		console.log("***  Highlights rendered ***");
	});
	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Career Highlights"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandHighlightDiv = makeExpansion(
		HighlightsDiv,
		header,
		null,
		false,
		0
	);
	return (
		<section className="highlights profile-section">
			<ExpandHighlightDiv
				highlights={highlights}
				candId={candId}
				handleUpdate={handleUpdate}
			/>
		</section>
	);
};

export default React.memo(Highlights, (prev, next) =>
	isEqual(prev.highlights, next.highlights)
);
