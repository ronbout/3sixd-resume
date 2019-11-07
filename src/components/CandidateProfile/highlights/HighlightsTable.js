import React, { useState } from "react";
import { Card } from "styledComponents/Card";
import Button from "styledComponents/Button";
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
	EditDialogColumn
} from "styledComponents/DataTables";
import "./css/highlights.css";
//import { objCopy } from "assets/js/library";
import highlightsData from "./highlightsData";

//import "./styles.css";
import KebabMenu from "./KebabMenu";
import SelectMenu from "./SelectMenu";
import SearchHighlightsDialog from "./SearchHighlightsDialog";

const HighlightsTable = props => {
	const {
		actions,
		highlights: highlightsData,
		showSkillsFlag,
		newHighlight,
		editFlag,
		editSkillNdx,
		includeInSummary,
		heading,
		listingCallbacks,
		skills,
		candId
	} = props;
	const [highlights, setHighlights] = useState(highlightsData);
	const [showSearch, setShowSearch] = useState(false);
	const [selectedRows, setSelectedRows] = useState(
		highlightsData.map(() => false)
	);
	const [selectCount, setSelectCount] = useState(0);

	// let highlights = highlightsData;

	// const setHighlights = newHighlights => {
	// 	highlights = objCopy(newHighlights);
	// };

	/**
	 * set highlight refs for focus
	 */

	const onMenuClick = (action, ndx) => {
		alert(action);
	};

	const showSearchDialog = () => {
		setShowSearch(true);
	};

	const hideSearchDialog = () => {
		setShowSearch(false);
	};

	const searchHighlights = () => {
		alert("searchHighlights");
	};

	const onHighlightChange = (ndx, highlight) => {
		const newHighlights = highlights.slice();
		newHighlights[ndx].highlight = highlight;
		setHighlights(newHighlights);
	};

	const handleRowToggle = (row, selected, count) => {
		console.log("handleRowToggle row, selected, count: ", row, selected, count);
		let sRows = selectedRows.slice();
		if (row === 0) {
			sRows = sRows.map(() => selected);
		} else {
			sRows[row - 1] = selected;
		}
		setSelectedRows(sRows);
		setSelectCount(count);
	};

	return (
		<Card tableCard className="highlights-section">
			<SelectMenu
				count={selectCount}
				onDeleteClick={() => onMenuClick("delete")}
				onMoveClick={() => onMenuClick("Move")}
				showSearchDialog={showSearchDialog}
			/>
			<DataTable
				baseId="highlights-table"
				onRowToggle={handleRowToggle}
				fixedHeader
				fixedHeight={500}
			>
				<TableHeader>
					<TableRow>
						<TableColumn></TableColumn>
						<TableColumn grow>Highlight</TableColumn>
						<TableColumn
							tooltipLabel="# of Skills attached"
							tooltipDelay={500}
							tooltipPosition="left"
							style={{ paddingLeft: "28px" }}
						>
							Skills
						</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{highlights.map(({ highlight, sequence, skills }, i) => {
						let skillsTooltip = {};
						if (skills.length) {
							skillsTooltip = {
								tooltipStyle: { background: "#ddd", color: "black" },
								tooltipDelay: 500,
								tooltipPosition: "left",
								tooltipLabel: skills.map(s => (
									<p key={s.id}>
										{s.id}-{s.name}
									</p>
								))
							};
						}

						return (
							<TableRow key={`hrow-${sequence}`.replace(/\s+/g, "-")}>
								<TableColumn>{i + 1}</TableColumn>
								<EditDialogColumn
									title=""
									large
									className="table-edit-full-width"
									dialogStyle={{ width: "550px" }}
									style={{ width: "100%" }}
									defaultValue={highlight}
									onOkClick={(value, event) => onHighlightChange(i, value)}
									label="Edit Highlight"
									rows={1}
									maxRows={4}
									maxLength={200}
									helpText="max chars = 200"
								/>
								<TableColumn
									className={skills.length ? "" : "md-text--error"}
									{...skillsTooltip}
								>
									<Button flat onClick={() => alert("edit Skills")}>
										{skills.length ? skills.length : "--"}
									</Button>
								</TableColumn>
								<KebabMenu ndx={i} onMenuClick={onMenuClick} />
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
			<SearchHighlightsDialog
				searchHighlights={searchHighlights}
				showSearch={showSearch}
				hideSearchDialog={hideSearchDialog}
			/>
		</Card>
	);
};
export default HighlightsTable;
