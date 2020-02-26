/* SocialMedia.js */
import React, { useContext } from "react";
import SocialMediaContainer from "./SocialMediaContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const SocialMediaDiv = ({ linkedInLink, githubLink, candId }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = (linkedIn, github) => {
		// instead of passing info up, use dispatch
		dispatch({
			type: "UPDATE_CAND",
			payload: {
				socialMedia: [
					{
						socialType: "LinkedIn",
						socialLink: linkedIn
					},
					{
						socialType: "Github",
						socialLink: github
					}
				]
			}
		});
	};

	return (
		<section>
			<SocialMediaContainer
				linkedInLink={linkedInLink}
				githubLink={githubLink}
				candId={candId}
				handleUpdate={handleSubmit}
			/>
		</section>
	);
};

const ExpandSocialMediaDiv = MakeExpansion(
	SocialMediaDiv,
	"Social Media Links",
	null,
	false,
	0,
	"280px"
);

const SocialMedia = ({ candId, linkedInLink, githubLink }) => {
	return (
		<section className="social profile-section">
			<ExpandSocialMediaDiv
				linkedInLink={linkedInLink}
				githubLink={githubLink}
				candId={candId}
			/>
		</section>
	);
};

export default React.memo(
	SocialMedia,
	(prev, next) =>
		isEqual(prev.linkedInLink, next.linkedInLink) &&
		isEqual(prev.githubLink, next.githubLink)
);
