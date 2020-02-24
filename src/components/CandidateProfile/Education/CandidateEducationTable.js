/* CandidateEducationTable.js */
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

const columnStylePadding = { paddingRight: "14px", minWidth: "70px" };

const CandidateEducationTable = ({ education, actions, onAddClick }) => {
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
						<TableColumn>Edit</TableColumn>
						<TableColumn>Delete</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{education.map((ed, ndx) => {
						return (
							<TableRow key={ndx}>
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
