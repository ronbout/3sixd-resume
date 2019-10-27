import { objCopy } from "assets/js/library";

export const highlightsReducer = (highlights, action) => {
	let tmpHighlights = objCopy(highlights);
	switch (action.type) {
		case "addHighlight":
			const newSequence =
				tmpHighlights.reduce((low, obj) => {
					return Math.max(low, obj.sequence);
				}, 0) + 1;
			tmpHighlights.push({
				id: "",
				highlight: action.newHighlight,
				skills: [],
				sequence: newSequence,
				includeInSummary: 0
			});
			return tmpHighlights;
		case "delHighlight":
			tmpHighlights.splice(action.ndx, 1);
			return tmpHighlights;
		case "moveHighlight": {
			const { ndx, newNdx } = action;
			const tmpHighlight = tmpHighlights.splice(ndx, 1)[0];
			tmpHighlights.splice(newNdx, 0, tmpHighlight);
			// need to update sequence
			const tmpSequence = tmpHighlights[newNdx].sequence;
			tmpHighlights[newNdx].sequence = tmpHighlights[ndx].sequence;
			tmpHighlights[ndx].sequence = tmpSequence;
			return tmpHighlights;
		}
		case "editHighlight": {
			const { ndx, editValue } = action;
			tmpHighlights[ndx].highlight = editValue;
			return tmpHighlights;
		}
		case "editSkills": {
			const { ndx, editValue } = action;
			tmpHighlights[ndx].skills = editValue;
			return tmpHighlights;
		}
		default:
			return tmpHighlights;
	}
};
