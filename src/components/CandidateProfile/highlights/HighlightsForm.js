/* HighlightsForm.js */
import React from "react";
import TextAreaBase from "styledComponents/TextAreaBase";
import Button from "styledComponents/Button";
import HighlightsTable from "./HighlightsTable";

const HighlightsForm = props => {
	const {
		actions,
		highlights,
		newHighlight,
		editFlag,
		editSkillNdx,
		includeInSummary,
		heading,
		listingCallbacks,
		candId,
		tableHeight,
		setAutoFocus = true
	} = props;

	const addHighlight = () => {
		return (
			<div className="add-highlight">
				{heading && <h2>{heading}</h2>}
				<div className="highlight-row">
					<div />
					<div>
						<TextAreaBase
							id="add-highlight-field"
							rows={1}
							maxLength={200}
							name="newHighlight"
							label="Enter a highlight and click Add"
							autoFocus={setAutoFocus}
							value={newHighlight}
							onChange={props.handleOnChange}
						/>
					</div>
					<div />
					<div style={{ paddingTop: "20px" }}>
						<Button
							type="button"
							className="btn btn-info"
							onClick={props.handleAddHighlight}
							disabled={newHighlight === ""}
						>
							Add
						</Button>
					</div>
					<div />
					<div />
				</div>
			</div>
		);
	};

	const highlightList = () => {
		const sortHighlights = highlights.sort((a, b) => a.sequence - b.sequence);
		const listingParms = {
			editFlag,
			editSkillNdx,
			includeSummaryButton: includeInSummary === true ? true : false
		};
		return (
			<HighlightsTable
				listingParms={listingParms}
				highlightsData={sortHighlights}
				actions={{ ...actions, skills: listingCallbacks.handleRowClick }}
				handleSkillsChange={props.handleSkillsChange}
				candId={candId}
				tableHeight={tableHeight}
			/>
		);
	};

	return (
		<section className="candidate-highlights candidate-tab-section">
			{addHighlight()}
			{highlights && highlightList()}
		</section>
	);
};

export default HighlightsForm;
