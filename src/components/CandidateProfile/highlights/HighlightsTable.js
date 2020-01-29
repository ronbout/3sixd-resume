import React, { useState, useEffect } from "react";
import { Card } from "styledComponents/Card";
import Button from "styledComponents/Button";
import {
	DataTable,
	TableCardHeader,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn
} from "styledComponents/DataTables";
import "./css/highlights.css";
import { objCopy } from "assets/js/library";

import KebabMenu from "./KebabMenu";
import EditHighlightsDialog from "./EditHighlightsDialog";

const HighlightsTable = ({
	highlightsData,
	actions,
	handleSkillsChange,
	candId,
	tableHeight = 360
}) => {
	const [highlights, setHighlights] = useState(objCopy(highlightsData));
	const [editNdx, setEditNdx] = useState(-1);

	const dataCount = highlights.length;

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

	const onHighlightChange = (ndx, highlight) => {
		const newHighlights = highlights.slice();
		newHighlights[ndx].highlight = highlight;
		setHighlights(newHighlights);
		actions.edit(ndx, highlight);
		hideEditDialog();
	};

	// const handleRowToggle = (row, selected, count) => {
	// 	console.log("handleRowToggle row, selected, count: ", row, selected, count);
	// 	let sRows = selectedRows.slice();
	// 	if (row === 0) {
	// 		sRows = sRows.map(() => selected);
	// 	} else {
	// 		sRows[row - 1] = selected;
	// 	}
	// 	setSelectedRows(sRows);
	// 	setSelectCount(count);
	// };

	return (
		<Card tableCard className="highlights-section">
			<TableCardHeader
				title={<span>Highlights</span>}
				visible={false}
			></TableCardHeader>
			<DataTable
				baseId="highlights-table"
				fixedHeader
				fixedHeight={tableHeight}
				plain
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
						<TableColumn>Edit</TableColumn>
						<TableColumn>Actions</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{highlights.map(({ highlight, id, sequence, skills }, i) => {
						let skillsTooltip = {};
						if (skills.length) {
							const position =
								i < 3 ? "bottom" : i > highlights.length - 3 ? "top" : "left";
							skillsTooltip = {
								tooltipStyle: { background: "#ddd", color: "black" },
								tooltipDelay: 500,
								tooltipPosition: position,
								tooltipLabel: skills.map(s => (
									<p key={`${id}-${s.id}`}>
										{s.id}-{s.name}
									</p>
								))
							};
						}

						return (
							<TableRow key={`hrow-${id}`}>
								<TableColumn style={{ paddingRight: "16px" }}>
									{i + 1}
								</TableColumn>
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
								<TableColumn style={{ paddingRight: "16px" }}>
									<Button
										variant="icon"
										color="secondary"
										onClick={() => onMenuClick("edit", i)}
									>
										edit
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
