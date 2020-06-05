/* CandidateEducationTable.js */
import React from "react";
import { Card } from "styledComponents/Card";
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
} from "styledComponents/DataTables";
import handleAddSkill from "components/SkillSetup/SkillList/handleAddSkill";
import Button from "styledComponents/Button";
import TableActions from "./TableActions";

const columnStylePadding = { paddingRight: "14px", minWidth: "70px" };

const CandidateEducationTable = ({
	education,
	actions,
	onAddClick,
	candId,
	updateEducation,
}) => {
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
		if (ndx < 0 || ndx > education.length) return;
		// console.log("skill drop index: ", ndx);
		const skillInfo = JSON.parse(event.dataTransfer.getData("profile/skill"));
		// console.log("skill drop info: ", skillInfo);
		const skills = education[ndx].skills;
		// console.log("skills before drop: ", skills);
		// use handleAddSkill from SkillList code to add skill
		handleAddSkill(skills, skillInfo, candId, (newSkills) => {
			education[ndx].skills = newSkills;
			// console.log("skills after drop: ", newSkills);
			updateEducation(education);
		});
	};
	return (
		<Card tableCard className="education-section">
			<TableActions onAddClick={onAddClick} />
			<DataTable plain baseId="education-table" fixedHeader fixedHeight={260}>
				<TableHeader>
					<TableRow>
						<TableColumn>Degree</TableColumn>
						<TableColumn>School</TableColumn>
						<TableColumn>Start Date</TableColumn>
						<TableColumn>End Date</TableColumn>
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
					</TableRow>
				</TableHeader>
				<TableBody>
					{education.map((ed, ndx) => {
						let skillsTooltip = {};
						if (ed.skills.length) {
							const position =
								ndx < 3
									? "bottom"
									: ndx > education.length - 3
									? "top"
									: "left";
							skillsTooltip = {
								tooltipStyle: { background: "#ddd", color: "black" },
								tooltipDelay: 500,
								tooltipPosition: position,
								tooltipLabel: ed.skills.map((s) => (
									<p key={`${ed.id}-${s.id}`}>
										{s.id}-{s.name}
									</p>
								)),
							};
						}
						return (
							<TableRow
								key={ndx}
								onDragOver={(ev) => handleDragOver(ev, ndx)}
								onDragEnd={(ev) => handleDragEnd(ev, ndx)}
								onDrop={(ev) => handleSkillDrop(ev, ndx)}
							>
								<TableColumn style={columnStylePadding}>
									{ed.degreeName}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{ed.schoolName}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{ed.startDate.slice(0, 7) || " "}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{ed.endDate.slice(0, 7) || " "}
								</TableColumn>
								<TableColumn
									style={{ paddingRight: "16px" }}
									className={ed.skills.length ? "" : "md-text--error"}
									{...skillsTooltip}
								>
									<Button
										variant="flat"
										onClick={() => {
											actions.edit(ndx);
										}}
									>
										{ed.skills.length ? ed.skills.length : "--"}
									</Button>
								</TableColumn>
								<TableColumn style={{ paddingRight: "16px" }}>
									<Button
										variant="icon"
										color="secondary"
										onClick={() => actions.edit(ndx)}
									>
										edit
									</Button>
								</TableColumn>
								<TableColumn style={{ paddingRight: "16px" }}>
									<Button
										variant="icon"
										className="md-text--error"
										onClick={() => actions.delete(ndx)}
									>
										delete
									</Button>
								</TableColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
		</Card>
	);
};

export default CandidateEducationTable;
