/* CandidateCertificationsTable.js */
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const columnStylePadding = { paddingRight: "14px", minWidth: "70px" };

const CandidateCertificationsTable = ({
	certifications,
	actions,
	onAddClick,
	candId,
	updateCertifications,
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
		if (ndx < 0 || ndx > certifications.length) return;
		// console.log("skill drop index: ", ndx);
		const skillInfo = JSON.parse(event.dataTransfer.getData("profile/skill"));
		// console.log("skill drop info: ", skillInfo);
		const skills = certifications[ndx].skills;
		// console.log("skills before drop: ", skills);
		// use handleAddSkill from SkillList code to add skill
		handleAddSkill(skills, skillInfo, candId, (newSkills) => {
			certifications[ndx].skills = newSkills;
			// console.log("skills after drop: ", newSkills);
			updateCertifications(certifications);
		});
	};
	return (
		<Card tableCard className="certifications-section">
			<TableActions onAddClick={onAddClick} />
			<DataTable
				plain
				baseId="certifications-table"
				fixedHeader
				fixedHeight={260}
			>
				<TableHeader>
					<TableRow>
						<TableColumn>Certificate</TableColumn>
						<TableColumn>Description</TableColumn>
						<TableColumn>Issue Date</TableColumn>
						<TableColumn>Image</TableColumn>
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
					{certifications.map((cert, ndx) => {
						let skillsTooltip = {};
						if (cert.skills.length) {
							const position =
								ndx < 3
									? "bottom"
									: ndx > certifications.length - 3
									? "top"
									: "left";
							skillsTooltip = {
								tooltipStyle: { background: "#ddd", color: "black" },
								tooltipDelay: 500,
								tooltipPosition: position,
								tooltipLabel: cert.skills.map((s) => (
									<p key={`${cert.id}-${s.id}`}>
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
									{cert.name}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.description}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.issueDate.slice(0, 7) || " "}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.certificateImage ? (
										<FontAwesomeIcon icon="check" />
									) : (
										""
									)}
								</TableColumn>
								<TableColumn
									style={{ paddingRight: "16px" }}
									className={cert.skills.length ? "" : "md-text--error"}
									{...skillsTooltip}
								>
									<Button
										variant="flat"
										onClick={() => {
											actions.edit(ndx);
										}}
									>
										{cert.skills.length ? cert.skills.length : "--"}
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

export default CandidateCertificationsTable;
