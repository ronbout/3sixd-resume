/* CandidateExperience.js */
import React, { useState, useEffect } from "react";
import CandidateExperienceTable from "./CandidateExperienceTable";
import CandidateExperienceCrud from "./CandidateExperienceCrud";
import Modal from "components/Modal/";

const CandidateExperience = (props) => {
	const [sortJobs, setSortJobs] = useState(props.sortJobs);
	const { actions, editNdx, handleAddNewJob } = props;

	useEffect(() => {
		setSortJobs(props.sortJobs);
	}, [props.sortJobs]);

	const experienceList = () => {
		return (
			<div className="experience-list">
				<CandidateExperienceTable
					jobs={sortJobs}
					actions={actions}
					onAddClick={handleAddNewJob}
					candId={props.candId}
					updateExperience={props.updateExperience}
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
