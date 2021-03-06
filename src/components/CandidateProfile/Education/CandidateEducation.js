/* CandidateEducation.js */
import React, { useState, useEffect } from "react";
import CandidateEducationTable from "./CandidateEducationTable";
import CandidateEducationCrud from "./CandidateEducationCrud";
import Modal from "components/Modal/";

const CandidateEducation = (props) => {
	const [sortEducation, setSortEducation] = useState(props.sortEducation);
	const { actions, editNdx, handleAddNewEducation, updateEducation } = props;

	useEffect(() => {
		setSortEducation(props.sortEducation);
	}, [props.sortEducation]);

	const educationList = () => {
		return (
			<div className="education-list">
				<CandidateEducationTable
					education={sortEducation}
					actions={actions}
					onAddClick={handleAddNewEducation}
					candId={props.candId}
					updateEducation={updateEducation}
				/>
			</div>
		);
	};

	const modalStyles = {
		modal: {
			width: "1080px",
			height: "780px",
			minWidth: "960px",
			margin: "1em auto 1em",
			paddingBottom: "0",
		},
	};

	return (
		<section className="candidate-education candidate-tab-section">
			{sortEducation && educationList()}
			{editNdx !== false && (
				<Modal
					modalHeader="Candidate Education Entry/Update"
					idName="candidate-modal"
					hideClose={true}
					styles={modalStyles}
				>
					<CandidateEducationCrud
						education={sortEducation[editNdx]}
						handleSave={props.handleSave}
						handleCancel={props.handleCancel}
						candId={props.candId}
					/>
				</Modal>
			)}
		</section>
	);
};

export default CandidateEducation;
