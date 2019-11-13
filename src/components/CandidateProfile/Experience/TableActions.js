/* TableActions.js */
import React from "react";
import { TableCardHeader } from "styledComponents/DataTables";
import Button from "styledComponents/Button";

const TableActions = ({ onAddClick }) => {
	const title = <span>Experience</span>;

	return (
		<TableCardHeader title={title} visible={false}>
			<Button variant="flat" iconChildren="add" onClick={onAddClick}>
				Add
			</Button>
		</TableCardHeader>
	);
};

export default TableActions;
