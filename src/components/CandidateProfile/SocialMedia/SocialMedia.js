/* SocialMedia.js */
import React, { useContext, useState } from "react";
import ProfileSectionHeader from "../ProfileSectionHeader";
import SocialMediaContainer from "./SocialMediaContainer";
import makeExpansion from "styledComponents/makeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const SocialMediaDiv = ({ linkedInLink, githubLink, candId, handleUpdate }) => {
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
		handleUpdate(linkedIn, github);
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

const SocialMedia = ({ candId, linkedInLink, githubLink }) => {
	// React.useEffect(() => {
	// 	console.log("***  Social Media rendered ***");
	// });

	const [toast, setToast] = useState({});
	const [expanded, setExpanded] = useState(false);

	const [formData, setFormData] = useState({
		linkedInLink,
		githubLink
	});

	const handleUpdate = (linkedInLink, githubLink) => {
		closeToast();
		setExpanded(true);
		setFormData({ linkedInLink, githubLink });
		const userMsg = "Social Media has been updated";
		addToast(userMsg);
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Social Media Links"
				profilePercentage="15"
				profileSectionCompleted={false}
			/>
		);
	};

	const onExpansionToggle = toggleState => {
		setExpanded(toggleState);
	};

	const ExpandSocialMediaDiv = makeExpansion(
		SocialMediaDiv,
		header,
		null,
		expanded,
		0,
		onExpansionToggle
	);

	return (
		<section className="social profile-section">
			<ExpandSocialMediaDiv
				linkedInLink={formData.linkedInLink}
				githubLink={formData.githubLink}
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

export default React.memo(
	SocialMedia,
	(prev, next) =>
		isEqual(prev.linkedInLink, next.linkedInLink) &&
		isEqual(prev.githubLink, next.githubLink)
);
