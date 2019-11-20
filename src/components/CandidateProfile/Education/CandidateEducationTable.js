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
import KebabMenu from "./KebabMenu";
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
									{ed.startDate || "2019-01-12"}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{ed.endDate || "2019-12-31"}
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

export default CandidateEducationTable;
