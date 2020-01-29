/* CandidateExperienceTable.js */
import React from "react";
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
						return (
							<TableRow key={ndx}>
								<TableColumn>{job.jobTitle}</TableColumn>
								<TableColumn>{job.company.name}</TableColumn>
								<TableColumn>{job.startDate}</TableColumn>
								<TableColumn>
									{job.endDate ? job.endDate : "current"}
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

export default CandidateExperienceTable;
