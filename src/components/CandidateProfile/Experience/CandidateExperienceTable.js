/* CandidateExperienceTable.js */
import React, { useState } from "react";
import { Card } from "styledComponents/Card";
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn
} from "styledComponents/DataTables";
import Button from "styledComponents/Button";
import TableActions from "./TableActions";

const CandidateExperienceTable = ({ jobs, actions, onAddClick }) => {
	const [lastEdit, setLastEdit] = useState(-1);
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
							<TableRow key={ndx}>
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
