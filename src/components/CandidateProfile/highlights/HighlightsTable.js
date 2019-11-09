import React, { useState, useEffect } from "react";
import { Card } from "styledComponents/Card";
import Button from "styledComponents/Button";
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn
} from "styledComponents/DataTables";
import "./css/highlights.css";
import { objCopy } from "assets/js/library";

import KebabMenu from "./KebabMenu";
import SelectMenu from "./SelectMenu";
import EditHighlightsDialog from "./EditHighlightsDialog";

const HighlightsTable = ({
	listingParms,
	highlightsData,
	actions,
	handleSkillsChange,
	setEditSkillNdx,
	candId
}) => {
	const [highlights, setHighlights] = useState(objCopy(highlightsData));
	const [editNdx, setEditNdx] = useState(-1);
	const [selectedRows, setSelectedRows] = useState(
		highlightsData.map(() => false)
	);
	const [selectCount, setSelectCount] = useState(0);

	const dataCount = highlights.length;

	useEffect(() => {
		setEditSkillNdx(editNdx);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editNdx]);

	useEffect(() => {
		setHighlights(objCopy(highlightsData));
	}, [highlightsData]);

	const onMenuClick = (action, ndx) => {
		switch (action) {
			case "skills":
				actions.skills(ndx);
				break;
			case "moveUp":
				actions.move(ndx, ndx - 1);
				break;
			case "moveDown":
				actions.move(ndx, ndx + 1);
				break;
			case "delete":
				actions.delete(ndx);
				break;
			case "edit":
				setEditNdx(ndx);
				break;
			default:
				console.log("invalid action");
		}
	};

	const hideEditDialog = () => {
		setEditNdx(-1);
	};

	const searchHighlights = () => {
		alert("searchHighlights");
	};

	const onHighlightChange = (ndx, highlight) => {
		const newHighlights = highlights.slice();
		newHighlights[ndx].highlight = highlight;
		setHighlights(newHighlights);
		actions.edit(ndx, highlight);
		hideEditDialog();
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
				onSearchClick={searchHighlights}
			/>
			<DataTable
				baseId="highlights-table"
				onRowToggle={handleRowToggle}
				fixedHeader
				fixedHeight={360}
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
								<TableColumn style={{ paddingRight: "16px" }}>
									{i + 1}
								</TableColumn>
								{/*}
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
						*/}
								<TableColumn
									className="table-edit-full-width"
									style={{
										maxWidth: "500px",
										overflow: "hidden",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										paddingRight: "16px"
									}}
									title={highlight}
								>
									{highlight}
								</TableColumn>
								<TableColumn
									style={{ paddingRight: "16px" }}
									className={skills.length ? "" : "md-text--error"}
									{...skillsTooltip}
								>
									<Button variant="flat" onClick={() => onMenuClick("edit", i)}>
										{skills.length ? skills.length : "--"}
									</Button>
								</TableColumn>
								<KebabMenu
									ndx={i}
									onMenuClick={onMenuClick}
									dataCount={dataCount}
								/>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
			<EditHighlightsDialog
				highlight={editNdx >= 0 ? highlights[editNdx] : ""}
				editNdx={editNdx}
				hideEditDialog={hideEditDialog}
				onHighlightChange={onHighlightChange}
				handleSkillsChange={handleSkillsChange}
				candId={candId}
			/>
		</Card>
	);
};
export default HighlightsTable;
