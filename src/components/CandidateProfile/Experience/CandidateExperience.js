import React from "react";
import CandidateExperienceTable from "./CandidateExperienceTable";
import CandidateExperienceCrud from "./CandidateExperienceCrud";
import Modal from "components/Modal/";

const CandidateExperience = props => {
	const { sortJobs, actions, editNdx } = props;

	// const experienceList = () => {
	// 	return (
	// 		<div className="experience-list justify-content-center">
	// 			<div className="experience-row">
	// 				<div className="heading">Job Title</div>
	// 				<div className="heading">Company Name</div>
	// 				<div className="heading">Start Date</div>
	// 				<div className="heading">End Date</div>
	// 				<div className="heading">Delete</div>
	// 				<div className="heading">Edit</div>
	// 			</div>
	// 			<ListingHoc
	// 				data={sortJobs}
	// 				actions={actions}
	// 				detailClassname="experience-row"
	// 			>
	// 				<CandidateExperienceListDetail />
	// 			</ListingHoc>
	// 		</div>
	// 	);
	// };

	const experienceList = () => {
		return (
			<div className="experience-list">
				<CandidateExperienceTable
					jobs={sortJobs}
					actions={actions}
					onAddClick={props.handleAddNewJob}
				/>
			</div>
		);
	};

	// const addButton = () => {
	// 	return (
	// 		<div className="add-job-button">
	// 			<button
	// 				type="button"
	// 				title="Add New Job"
	// 				onClick={props.handleAddNewJob}
	// 			>
	// 				Add Experience
	// 			</button>
	// 		</div>
	// 	);
	// };

	const modalStyles = {
		modal: {
			width: "1080px",
			height: "700px",
			minWidth: "960px",
			margin: "auto"
		}
	};

	return (
		<section className="candidate-experience candidate-tab-section">
			{sortJobs && experienceList()}
			{/*addButton()*/}
			{editNdx !== false && (
				<Modal
					modalHeader="Candidate Experience Entry/Update"
					idName="candidate-modal"
					hideClose={true}
					styles={modalStyles}
				>
					<CandidateExperienceCrud
						experience={sortJobs[editNdx]}
						handleSave={props.handleSave}
						handleCancel={props.handleCancel}
						candId={props.candId}
					/>
				</Modal>
			)}
		</section>
	);
};

export default CandidateExperience;
