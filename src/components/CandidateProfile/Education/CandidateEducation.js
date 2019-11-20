/* CandidateEducation.js */
import React from "react";
import CandidateEducationTable from "./CandidateEducationTable";
import CandidateEducationCrud from "./CandidateEducationCrud";
import Modal from "components/Modal/";

const CandidateEducation = props => {
	const { sortEducation, actions, editNdx, handleAddNewEducation } = props;

	// function educationList() {
	// 	return (
	// 		<div className="education-list justify-content-center">
	// 			<div className="education-row">
	// 				<div className="heading">Degree</div>
	// 				<div className="heading">School</div>
	// 				<div className="heading">Start Date</div>
	// 				<div className="heading">End Date</div>
	// 				<div className="heading">Delete</div>
	// 				<div className="heading">Edit</div>
	// 			</div>
	// 			<ListingHoc
	// 				data={sortEducation}
	// 				actions={actions}
	// 				detailClassname="education-row"
	// 			>
	// 				<CandidateEducationListDetail />
	// 			</ListingHoc>
	// 		</div>
	// 	);
	// }

	const educationList = () => {
		return (
			<div className="education-list">
				<CandidateEducationTable
					education={sortEducation}
					actions={actions}
					onAddClick={handleAddNewEducation}
				/>
			</div>
		);
	};

	const modalStyles = {
		modal: {
			width: "1080px",
			height: "700px",
			minWidth: "960px",
			margin: "auto"
		}
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
