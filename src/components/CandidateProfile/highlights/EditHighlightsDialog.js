import React, { useState, useEffect } from "react";
import SkillList from "../../SkillSetup/SkillList";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import TextAreaBase from "styledComponents/TextAreaBase";

const EditHighlightsDialog = ({
	highlight: highlightData,
	editNdx,
	hideEditDialog,
	onHighlightChange,
	handleSkillsChange,
	candId
}) => {
	const [highlight, setHighlight] = useState(highlightData.highlight);
	const [skills, setSkills] = useState(highlightData.skills || []);

	useEffect(() => {
		setHighlight(highlightData.highlight);
		setSkills(highlightData.skills || []);
	}, [highlightData]);

	const handleOnChange = highval => {
		setHighlight(highval);
	};

	const actions = [];
	actions.push({
		secondary: true,
		children: "Cancel",
		onClick: hideEditDialog
	});
	actions.push(
		<Button
			variant="flat"
			color="primary"
			onClick={() => onHighlightChange(editNdx, highlight)}
		>
			OK
		</Button>
	);

	return (
		<DialogContainer
			id="highlight-edit-dialog"
			visible={editNdx >= 0}
			onHide={hideEditDialog}
			actions={actions}
			title="Edit Highlight"
			height={400}
			width={600}
		>
			<div>
				<TextAreaBase
					id="highlight-edit"
					label={`Edit Highlight #${editNdx + 1}`}
					value={highlight}
					onChange={handleOnChange}
					rows={2}
				/>
			</div>
			<div className="skill-edit-list">
				<SkillList
					skills={skills}
					editFlag={true}
					handleSkillsChange={handleSkillsChange}
					candId={candId}
				/>
			</div>
		</DialogContainer>
	);
};

export default EditHighlightsDialog;
