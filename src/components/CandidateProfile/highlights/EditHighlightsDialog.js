import React, { useState } from "react";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import TextAreaBase from "styledComponents/TextAreaBase";

const EditHighlightsDialog = ({
	highlight,
	showSearch,
	editHighlights,
	hideSearchDialog
}) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleOnChange = term => {
		setSearchTerm(term);
	};

	const actions = [];
	actions.push({
		secondary: true,
		children: "Cancel",
		onClick: hideSearchDialog
	});
	actions.push(
		<Button flat primary onClick={highlight => editHighlights(searchTerm)}>
			Search
		</Button>
	);

	return (
		<DialogContainer
			id="highlight-search-dialog"
			visible={showSearch}
			onHide={hideSearchDialog}
			actions={actions}
			title="Search Highlights"
			height={400}
			width={600}
		>
			<div>
				<TextAreaBase
					id="highlight-search-term"
					label="Search Term"
					value={highlight}
					onChange={handleOnChange}
					rows={2}
				/>
			</div>
		</DialogContainer>
	);
};

export default EditHighlightsDialog;
