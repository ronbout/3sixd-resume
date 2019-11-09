import React from "react";
import TextAreaBase from "styledComponents/TextAreaBase";
import Button from "styledComponents/Button";
import SkillList from "../../SkillSetup/SkillList";
import HighlightsTable from "./HighlightsTable";

const HighlightsForm = props => {
	const {
		actions,
		highlights,
		showSkillsFlag,
		newHighlight,
		editFlag,
		editSkillNdx,
		includeInSummary,
		heading,
		listingCallbacks,
		skills,
		setEditSkillNdx,
		candId
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
							value={newHighlight}
							onChange={props.handleOnChange}
						/>
					</div>
					<div />
					<div>
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

	// const highlightList = () => {
	// 	const sortHighlights = highlights.sort((a, b) => a.sequence - b.sequence);
	// 	// setup current parms for listing hoc
	// 	const listingParms = {
	// 		editFlag,
	// 		editSkillNdx,
	// 		includeSummaryButton: includeInSummary === true ? true : false
	// 	};
	// 	return (
	// 		<div className="highlight-list justify-content-center">
	// 			<ListingHoc
	// 				data={sortHighlights}
	// 				actions={actions}
	// 				detailClassname="highlight-row"
	// 				callBacks={listingCallbacks}
	// 				parms={listingParms}
	// 			>
	// 				<HighlightDetail />
	// 			</ListingHoc>
	// 		</div>
	// 	);
	// };

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
				setEditSkillNdx={setEditSkillNdx}
				candId={candId}
			/>
		);
	};

	const displaySkills = () => {
		return (
			<div className="skill-edit-list">
				<SkillList
					skills={skills}
					editFlag={editFlag}
					handleSkillsChange={props.handleSkillsChange}
					candId={candId}
				/>
			</div>
		);
	};

	return (
		<section className="candidate-highlights candidate-tab-section">
			{addHighlight()}
			{highlights && highlightList()}
			{false && showSkillsFlag && displaySkills()}
		</section>
	);
};

export default HighlightsForm;
