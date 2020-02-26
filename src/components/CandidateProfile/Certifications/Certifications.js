/* Certification.js */
import React, { useContext } from "react";
import CandidateCertificationContainer from "./CandidateCertificationsContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
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

const ExpandCertificationDiv = MakeExpansion(
	CertificationDiv,
	"Certifications",
	null,
	false,
	0,
	"386px"
);

const Certifications = ({ certifications, candId }) => {
	return (
		<section className="Certification profile-section">
			<ExpandCertificationDiv certifications={certifications} candId={candId} />
		</section>
	);
};

export default React.memo(Certifications, (prev, next) =>
	isEqual(prev.certifications, next.certifications)
);
