import React, { useState, useEffect } from "react";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import TextAreaBase from "styledComponents/TextAreaBase";

const EditHighlightsDialog = ({
	highlight: highlightData,
	editNdx,
	hideEditDialog,
	onHighlightChange
}) => {
	const [highlight, setHighlight] = useState(highlightData.highlight);

	useEffect(() => {
		setHighlight(highlightData.highlight);
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
			Save
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
		</DialogContainer>
	);
};

export default EditHighlightsDialog;
