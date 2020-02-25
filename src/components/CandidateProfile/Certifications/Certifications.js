/* Certification.js */
import React, { useState, useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateCertificationContainer from "./CandidateCertificationsContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const CertificationDiv = ({ certifications, candId, handleUpdate }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = certifications => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { certifications }
		});
		handleUpdate(certifications);
	};

	return (
		<section>
			<CandidateCertificationContainer
				certifications={certifications}
				candId={candId}
				handleSubmit={handleSubmit}
			/>
		</section>
	);
};

const header = () => {
	return (
		<ProfileSectionHeader
			headerTitle="Certifications"
			profilePercentage="10"
			profileSectionCompleted={true}
		/>
	);
};

// const onExpansionToggle = toggleState => {
// 	setExpanded(toggleState);
// };

const ExpandCertificationDiv = makeExpansion(
	CertificationDiv,
	header,
	null,
	false,
	0
);

const Certifications = ({ certifications, candId }) => {
	const [toast, setToast] = useState({});
	// const [expanded, setExpanded] = useState(false);
	const [formData, setFormData] = useState({
		certifications: objCopy(certifications)
	});

	const handleUpdate = certifications => {
		closeToast();
		// setExpanded(true);
		setFormData({ certifications });
		const userMsg = "Certifications have been updated";
		addToast(userMsg);
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	return (
		<section className="Certification profile-section">
			<ExpandCertificationDiv
				certifications={formData.certifications}
				candId={candId}
				handleUpdate={handleUpdate}
			/>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					onDismiss={closeToast}
				/>
			)}
		</section>
	);
};

export default React.memo(Certifications, (prev, next) =>
	isEqual(prev.certifications, next.certifications)
);
