/* HighlightsFormContainer.js */
import React, { useState, useReducer, useEffect } from "react";
import HighlightsForm from "./HighlightsForm";
import { highlightsReducer } from "./highlightsReducer";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import { isEqual } from "lodash";

const HighlightsFormContainer = props => {
	const [highlights, dispatch] = useReducer(
		highlightsReducer,
		props.highlights
	);
	const [delNdx, setDelNdx] = useState(-1);
	const [newHighlight, setNewHightlight] = useState("");
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		if (!isEqual(highlights, props.highlights)) passHighlightUp(highlights);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [highlights]);

	const passHighlightUp = tmpHighlights => {
		//console.log("pass highlight up: ", tmpHighlights);
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
		setDelNdx(ndx);
	};

	const hideDelDialog = () => {
		setDelNdx(-1);
	};

	const confirmedDelete = () => {
		dispatch({ type: "delHighlight", delNdx });
		hideDelDialog();
	};

	const delDialogActions = [
		{ secondary: true, children: "Cancel", onClick: hideDelDialog },
		<Button
			className="btn btn-danger"
			variant="flat"
			color="primary"
			onClick={confirmedDelete}
		>
			Delete
		</Button>
	];

	const handleMoveHighlight = (ndx, newNdx) => {
		dispatch({ type: "moveHighlight", ndx, newNdx });
	};

	const handleEditHighlight = (ndx, val) => {
		dispatch({ type: "editHighlight", ndx, editValue: val });
	};

	const handleSkillsChange = (newSkills, ndx) => {
		dispatch({ type: "editSkills", ndx, editValue: newSkills });
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
		handleIncludeSummary
	};

	return (
		<React.Fragment>
			<HighlightsForm
				actions={actions}
				highlights={highlights}
				newHighlight={newHighlight}
				includeInSummary={props.includeInSummary}
				heading={props.heading}
				listingCallbacks={listingCallbacks}
				skills={skills}
				handleOnChange={handleOnChange}
				handleAddHighlight={handleAddHighlight}
				handleSkillsChange={handleSkillsChange}
				candId={props.candId}
				tableHeight={props.tableHeight || 360}
				setAutoFocus={props.setAutoFocus}
			/>
			<DialogContainer
				id="delete-dialog"
				visible={delNdx >= 0}
				onHide={hideDelDialog}
				title="Delete Highlight"
				actions={delDialogActions}
			>
				<p>You are going to delete Highlight # {delNdx + 1}.</p>
				Are you sure?
			</DialogContainer>
		</React.Fragment>
	);
};

export default HighlightsFormContainer;
