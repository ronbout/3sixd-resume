/* SocialMedia.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import SocialMediaContainer from "./SocialMediaContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { isEqual } from "lodash";

const SocialMediaDiv = ({ linkedInLink, githubLink, candId, handleUpdate }) => {
	const handleSubmit = socialMedia => {
		handleUpdate({ socialMedia });
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

const SocialMedia = ({ candId, linkedInLink, githubLink, handleUpdate }) => {
	// React.useEffect(() => {
	// 	console.log("***  Social Media rendered ***");
	// });
	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Social Media Links"
				profilePercentage="15"
				profileSectionCompleted={false}
			/>
		);
	};

	const ExpandSocialMediaDiv = makeExpansion(
		SocialMediaDiv,
		header,
		null,
		false,
		0
	);

	return (
		<section className="social profile-section">
			<ExpandSocialMediaDiv
				linkedInLink={linkedInLink}
				githubLink={githubLink}
				candId={candId}
				handleUpdate={handleUpdate}
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
