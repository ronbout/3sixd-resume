/* Certification.js */
import React, { useState, useEffect } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateCertificationContainer from "./CandidateCertificationsContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";

const CertificationDiv = ({
	certifications,
	candId,
	handleCertificationChange
}) => {
	return (
		<section>
			<CandidateCertificationContainer
				certifications={certifications}
				candId={candId}
				handleCertificationChange={handleCertificationChange}
			/>
		</section>
	);
};

const Certifications = props => {
	const [certifications, setCertification] = useState(
		objCopy(props.certifications)
	);

	useEffect(() => {
		setCertification(objCopy(props.certifications));
	}, [props.certifications]);

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Certifications"
				profilePercentage="10"
				profileSectionCompleted={true}
			/>
		);
	};

	const ExpandCertificationDiv = makeExpansion(
		CertificationDiv,
		header,
		null,
		false,
		0
	);

	return (
		<section className="Certification profile-section">
			<ExpandCertificationDiv
				certifications={certifications}
				candId={props.candId}
			/>
		</section>
	);
};

export default Certifications;
