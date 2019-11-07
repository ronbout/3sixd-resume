import React, { useState, useReducer, useEffect } from "react";
import HighlightsForm from "./HighlightsForm";
import { highlightsReducer } from "./highlightsReducer";
import { isEqual } from "lodash";

const HighlightsFormContainer = props => {
	//const [editFlag, setEditFlag] = useState(false);
	const [highlights, dispatch] = useReducer(
		highlightsReducer,
		props.highlights
	);

	const [showSkillsFlag, setShowSkillsFlag] = useState(false);
	const [newHighlight, setNewHightlight] = useState("");
	const [editSkillNdx, setEditSkillNdx] = useState("");
	const [skills, setSkills] = useState([]);
	const editFlag = true;

	useEffect(() => {
		if (!isEqual(highlights, props.highlights)) passHighlightUp(highlights);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [highlights]);

	const passHighlightUp = tmpHighlights => {
		console.log("pass highlight up: ", tmpHighlights);
		props.handleHighlightChange && props.handleHighlightChange(tmpHighlights);
	};

	const handleOnChange = newHighlight => {
		setNewHightlight(newHighlight);
	};

	const handleAddHighlight = () => {
		dispatch({ type: "addHighlight", newHighlight });
		setNewHightlight("");
	};

	const handleDelHighlight = ndx => {
		dispatch({ type: "addHighlight", ndx });
		// if the deleted highlight is the edit
		// highlight, turn off edit mode
		if (editSkillNdx === ndx) {
			setEditSkillNdx("");
			setShowSkillsFlag(false);
		}
	};

	const handleMoveHighlight = (ndx, newNdx) => {
		dispatch({ type: "moveHighlight", ndx, newNdx });
		// if highlight being moved is the edit highlight,
		// update the edit ndx.
		if (editSkillNdx === ndx) setEditSkillNdx(newNdx);
	};

	const handleEditHighlight = (ndx, val) => {
		dispatch({ type: "editHighlight", ndx, editValue: val });
	};

	const handleRowClick = ndx => {
		setShowSkillsFlag(true);
		setEditSkillNdx(ndx);
		setSkills(props.highlights[ndx].skills);
		//if (editSkillNdx !== ndx) setEditFlag(false);
	};

	const handleSkillsChange = newSkills => {
		dispatch({ type: "editSkills", ndx: editSkillNdx, editValue: newSkills });
		setSkills(newSkills);
	};

	const handleIncludeSummary = ndx => {
		let tmp = props.highlights.slice();
		tmp[ndx].includeInSummary = !tmp[ndx].includeInSummary;
		passHighlightUp(tmp);
	};

	const actions = {
		delete: handleDelHighlight,
		move: handleMoveHighlight,
		edit: handleEditHighlight
	};

	const listingCallbacks = {
		handleRowClick,
		handleEditHighlight,
		handleIncludeSummary
	};

	return (
		<HighlightsForm
			actions={actions}
			highlights={highlights}
			showSkillsFlag={showSkillsFlag}
			newHighlight={newHighlight}
			editFlag={editFlag}
			editSkillNdx={editSkillNdx}
			includeInSummary={props.includeInSummary}
			heading={props.heading}
			listingCallbacks={listingCallbacks}
			skills={skills}
			handleOnChange={handleOnChange}
			handleAddHighlight={handleAddHighlight}
			handleSkillsChange={handleSkillsChange}
			candId={props.candId}
		/>
	);
};

export default HighlightsFormContainer;
