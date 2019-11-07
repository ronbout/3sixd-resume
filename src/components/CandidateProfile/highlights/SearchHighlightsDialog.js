import React, { useState } from "react";
import {
	DialogContainer,
	TextField,
	Button,
	SelectionControlGroup,
	Switch
} from "react-md";

const AdvancedSearch = props => {
	const [termType, setTermType] = useState("S");

	const onChangeTermType = termType => {
		setTermType(termType);
	};
	return (
		<div style={{ textAlign: "left", marginTop: "24px" }}>
			<div>
				<SelectionControlGroup
					id="skills-techtags-radios"
					name="termType"
					type="radio"
					inline
					label="Search Term Type"
					value={termType}
					onChange={onChangeTermType}
					controls={[
						{
							label: "Skill",
							value: "S"
						},
						{
							label: "Techtag",
							value: "T"
						}
					]}
				/>
			</div>
			<div className="md-grid">
				<Switch
					id="parent-skills"
					className="md-cell--6"
					type="switch"
					label="Include Parent Skills"
					name="parentSkillsSwitch"
				/>
				<Switch
					id="child-skills"
					className="md-cell--6"
					type="switch"
					label="Include Child Skills"
					name="childSkillsSwitch"
				/>
			</div>
		</div>
	);
};

const SearchHighlightsDialog = ({
	showSearch,
	searchHighlights,
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
		<Button flat primary onClick={searchTerm => searchHighlights(searchTerm)}>
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
				<TextField
					id="highlight-search-term"
					label="Search Term"
					value={searchTerm}
					onChange={handleOnChange}
				/>
				<AdvancedSearch />
			</div>
		</DialogContainer>
	);
};

export default SearchHighlightsDialog;
