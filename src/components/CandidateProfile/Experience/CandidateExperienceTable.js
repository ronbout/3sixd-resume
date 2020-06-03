/* CandidateExperienceTable.js */
import React, { useState } from "react";
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

const CandidateExperienceTable = ({
	jobs,
	actions,
	onAddClick,
	candId,
	updateExperience,
}) => {
	const [lastEdit, setLastEdit] = useState(-1);

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
		if (ndx < 0 || ndx > jobs.length) return;
		console.log("skill drop index: ", ndx);
		const skillInfo = JSON.parse(event.dataTransfer.getData("profile/skill"));
		console.log("skill drop info: ", skillInfo);
		const skills = jobs[ndx].skills;
		console.log("skills before drop: ", skills);
		// use handleAddSkill from SkillList code to add skill
		handleAddSkill(skills, skillInfo, candId, (newSkills) => {
			// handleSkillsChange(newSkills, ndx)
			// put new skills list into the jobs array
			// and pass back up to updateExperience
			jobs[ndx].skills = newSkills;
			console.log("skills after drop: ", newSkills);
			updateExperience(jobs);
		});
	};
	return (
		<Card tableCard className="experience-section">
			<TableActions onAddClick={onAddClick} />
			<DataTable plain baseId="experience-table" fixedHeader fixedHeight={260}>
				<TableHeader>
					<TableRow>
						<TableColumn>Job Title</TableColumn>
						<TableColumn>Company Name</TableColumn>
						<TableColumn>Start Date</TableColumn>
						<TableColumn>End Date</TableColumn>
						<TableColumn>Edit</TableColumn>
						<TableColumn>Delete</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{jobs.map((job, ndx) => {
						const editClass = ndx === lastEdit ? "md-btn--hover" : "";
						return (
							<TableRow
								key={ndx}
								onDragOver={(ev) => handleDragOver(ev, ndx)}
								onDragEnd={(ev) => handleDragEnd(ev, ndx)}
								onDrop={(ev) => handleSkillDrop(ev, ndx)}
							>
								<TableColumn>{job.jobTitle}</TableColumn>
								<TableColumn>{job.company.name}</TableColumn>
								<TableColumn>{job.startDate.slice(0, 7)}</TableColumn>
								<TableColumn>
									{job.endDate ? job.endDate.slice(0, 7) : "current"}
								</TableColumn>
								<TableColumn style={{ paddingRight: "16px" }}>
									<Button
										className={editClass}
										variant="icon"
										color="secondary"
										onClick={() => {
											actions.edit(ndx);
											setLastEdit(ndx);
										}}
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

export default CandidateExperienceTable;
