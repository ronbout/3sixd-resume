/* Certification.js */
import React, { useState, useEffect, useContext } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateCertificationContainer from "./CandidateCertificationsContainer";
import { objCopy } from "assets/js/library.js";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const CertificationDiv = ({ certifications, candId }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = certifications => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { certifications }
		});
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

const Certifications = props => {
	const [certifications, setCertification] = useState(
		objCopy(props.certifications)
	);

	// React.useEffect(() => {
	// 	console.log("***  Certs rendered ***");
	// });

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

export default React.memo(Certifications, (prev, next) =>
	isEqual(prev.certifications, next.certifications)
);
