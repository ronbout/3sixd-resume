import React from "react";
import { Card } from "styledComponents/Card";
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn
} from "styledComponents/DataTables";
import KebabMenu from "./KebabMenu";
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
								<KebabMenu ndx={ndx} actions={actions} />
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
		</Card>
	);
};

export default CandidateExperienceTable;
