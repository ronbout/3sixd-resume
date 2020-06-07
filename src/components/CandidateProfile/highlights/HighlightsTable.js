import React, { useState, useEffect } from "react";
import { Card } from "styledComponents/Card";
import Button from "styledComponents/Button";
import {
	DataTable,
	TableCardHeader,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
} from "styledComponents/DataTables";
import handleAddSkill from "components/SkillSetup/SkillList/handleAddSkill";
import "./css/highlights.css";
import { objCopy } from "assets/js/library";

import KebabMenu from "./KebabMenu";
import EditHighlightsDialog from "./EditHighlightsDialog";

const HighlightsTable = ({
	listingParms,
	highlightsData,
	actions,
	handleSkillsChange,
	candId,
	tableHeight = 360,
	setShowSkills,
}) => {
	const [highlights, setHighlights] = useState(objCopy(highlightsData));
	const [editNdx, setEditNdx] = useState(listingParms.setEditNdx);

	useEffect(() => {
		setEditNdx(listingParms.setEditNdx);
	}, [listingParms.setEditNdx]);

	const dataCount = highlights.length;

	useEffect(() => {
		setHighlights(objCopy(highlightsData));
	}, [highlightsData]);

	const onMenuClick = (action, ndx) => {
		switch (action) {
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
				setShowSkills && setShowSkills(!(ndx >= 0));
				break;
			default:
				console.log("invalid action");
		}
	};

	const hideEditDialog = () => {
		setEditNdx(-1);
		setShowSkills && setShowSkills(true);
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

	const handleDragOver = (event, ndx) => {
		event.preventDefault && event.preventDefault();
		event.dataTransfer.dropEffect = "move";
		// console.log("drag over index: ", ndx);
	};

	const handleDragEnd = (event, ndx) => {
		console.log("drag end index: ", ndx);
	};

	const handleSkillDrop = (event, ndx) => {
		event.preventDefault && event.preventDefault();
		if (ndx < 0 || ndx > highlights.length) return;
		console.log("skill drop index: ", ndx);
		const skillInfo = JSON.parse(event.dataTransfer.getData("profile/skill"));
		console.log("skill drop info: ", skillInfo);
		const skills = highlights[ndx].skills;
		// use handleAddSkill from SkillList code to add skill
		handleAddSkill(skills, skillInfo, candId, (newSkills) =>
			handleSkillsChange(newSkills, ndx)
		);
	};

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
						<TableColumn>Delete</TableColumn>
						<TableColumn>Move</TableColumn>
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
								tooltipLabel: skills.map((s) => (
									<p key={`${id}-${s.id}`}>
										{s.id}-{s.name}
									</p>
								)),
							};
						}

						return (
							<TableRow
								key={`hrow-${i}`}
								onDragOver={(ev) => handleDragOver(ev, i)}
								onDragEnd={(ev) => handleDragEnd(ev, i)}
								onDrop={(ev) => handleSkillDrop(ev, i)}
							>
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
										paddingRight: "16px",
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
								<TableColumn style={{ paddingRight: "16px" }}>
									<Button
										variant="icon"
										color="secondary"
										className="md-text--error"
										onClick={() => onMenuClick("delete", i)}
									>
										delete
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
