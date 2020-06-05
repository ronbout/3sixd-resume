/* CandidateCertifications.js */
import React, { useState, useEffect } from "react";
import CandidateCertificationsTable from "./CandidateCertificationsTable";
import CandidateCertificationCrud from "./CandidateCertificationCrud";
import Modal from "components/Modal/";

const CandidateCertifications = (props) => {
	const [certifications, setCertifications] = useState(props.certifications);
	const {
		actions,
		editNdx,
		handleAddNewCertification,
		updateCertifications,
	} = props;

	useEffect(() => {
		setCertifications(props.certifications);
	}, [props.certifications]);

	const certificationList = () => {
		return (
			<div className="certifications-list">
				<CandidateCertificationsTable
					certifications={certifications}
					actions={actions}
					onAddClick={handleAddNewCertification}
					candId={props.candId}
					updateCertifications={updateCertifications}
				/>
			</div>
		);
	};

	const modalStyles = {
		modal: {
			width: "1080px",
			height: "660px",
			minWidth: "960px",
			margin: "auto",
		},
	};

	return (
		<section className="candidate-certifications candidate-tab-section">
			{certifications && certificationList()}
			{editNdx !== false && (
				<Modal
					modalHeader="Candidate Certification Entry/Update"
					idName="cert-modal"
					hideClose={true}
					styles={modalStyles}
				>
					<CandidateCertificationCrud
						certification={certifications[editNdx]}
						handleSave={props.handleSave}
						handleCancel={props.handleCancel}
						candId={props.candId}
					/>
				</Modal>
			)}
		</section>
	);
};

export default CandidateCertifications;
