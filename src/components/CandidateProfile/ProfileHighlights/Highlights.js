import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "./HighlightsContainer";
import makeExpansion from "styledComponents/makeExpansion";

const HighlightsDiv = ({ highlights, candId }) => {
	return (
		<section>
			<HighlightsContainer highlights={highlights} candId={candId} />
		</section>
	);
};

const Highlights = props => {
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
			<ExpandHighlightDiv highlights={props.highlights} candId={props.candId} />
		</section>
	);
};

export default Highlights;
