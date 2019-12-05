/* CandidateCertificationsTable.js */
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const columnStylePadding = { paddingRight: "14px", minWidth: "70px" };

const CandidateCertificationsTable = ({
	certifications,
	actions,
	onAddClick
}) => {
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
					</TableRow>
				</TableHeader>
				<TableBody>
					{certifications.map((cert, ndx) => {
						return (
							<TableRow key={ndx}>
								<TableColumn style={columnStylePadding}>
									{cert.name}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.description}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.issueDate || " "}
								</TableColumn>
								<TableColumn style={columnStylePadding}>
									{cert.certificateImage ? (
										<FontAwesomeIcon icon="check" />
									) : (
										""
									)}
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

export default CandidateCertificationsTable;
