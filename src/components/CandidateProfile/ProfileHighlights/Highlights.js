/* Highlights.js */
import React, { useContext } from "react";
import HighlightsContainer from "./HighlightsContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const HighlightsDiv = ({ highlights, candId, setShowSkills }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = (highlights) => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { candidateHighlights: highlights },
		});
	};

	return (
		<section>
			<HighlightsContainer
				highlights={highlights}
				candId={candId}
				handleSubmit={handleSubmit}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

const ExpandHighlightDiv = MakeExpansion(
	HighlightsDiv,
	"Career Highlights",
	null,
	false,
	0,
	"606px"
);

const Highlights = ({ highlights, candId, setShowSkills }) => {
	return (
		<section className="highlights profile-section">
			<ExpandHighlightDiv
				highlights={highlights}
				candId={candId}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

export default React.memo(Highlights, (prev, next) =>
	isEqual(prev.highlights, next.highlights)
);
