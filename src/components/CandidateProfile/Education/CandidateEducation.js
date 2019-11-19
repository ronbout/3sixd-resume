/* CandidateEducation.js */
import React from "react";
import CandidateEducationCrud from "./CandidateEducationCrud";
import Modal from "components/Modal";
import ListingHoc from "components/hoc/ListingHoc";
import CandidateEducationListDetail from "./CandidateEducationListDetail";

const CandidateEducation = props => {
	const { editNdx, sortEducation, actions } = props;

	const modalStyles = {
		modal: {
			width: "80%",
			height: "600px",
			minWidth: "960px"
		}
	};
	return (
		<section className="candidate-education candidate-tab-section">
			{sortEducation && educationList()}
			{addButton()}
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

	function educationList() {
		return (
			<div className="education-list justify-content-center">
				<div className="education-row">
					<div className="heading">Degree</div>
					<div className="heading">School</div>
					<div className="heading">Start Date</div>
					<div className="heading">End Date</div>
					<div className="heading">Delete</div>
					<div className="heading">Edit</div>
				</div>
				<ListingHoc
					data={sortEducation}
					actions={actions}
					detailClassname="education-row"
				>
					<CandidateEducationListDetail />
				</ListingHoc>
			</div>
		);
	}

	function addButton() {
		return (
			<div className="add-education-button">
				<button
					type="button"
					title="Add New Job"
					onClick={props.handleAddNewEducation}
				>
					Add Education
				</button>
			</div>
		);
	}
};

export default CandidateEducation;
