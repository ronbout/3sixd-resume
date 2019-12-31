/* SocialMedia.js */
import React from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import SocialMediaContainer from "./SocialMediaContainer";
import makeExpansion from "styledComponents/makeExpansion";

const SocialMediaDiv = ({ linkedInLink, githubLink, candId }) => {
	return (
		<section>
			<SocialMediaContainer
				linkedInLink={linkedInLink}
				githubLink={githubLink}
				candId={candId}
			/>
		</section>
	);
};

const SocialMedia = ({ candId, linkedInLink, githubLink }) => {
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
			/>
		</section>
	);
};

export default SocialMedia;
