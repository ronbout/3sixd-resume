/* SocialMediaContainer.js */
import React, { useState, useEffect } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import SocialMediaForm from "./SocialMediaForm";
import dataFetch from "assets/js/dataFetch";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const API_CANDIDATES = "candidates/";
const API_SOCIAL = "/social";

const SocialMediaContainer = ({
	candId,
	linkedInLink,
	githubLink,
	handleUpdate
}) => {
	const [toast, setToast] = useState({});
	const [linkedIn, setLinkedIn] = useState(linkedInLink);
	const [github, setGithub] = useState(githubLink);

	useEffect(() => {
		setLinkedIn(linkedInLink);
		setGithub(githubLink);
	}, [linkedInLink, githubLink]);

	const handleSubmit = formData => {
		postSocialMedia(formData);
	};

	const postSocialMedia = async ({ linkedIn, github }) => {
		closeToast();
		let body = {
			linkedIn,
			github
		};
		const id = candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_SOCIAL}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log(result);
			addToast("An unknown error occurred", "Close", false);
		} else {
			// setLinkedIn(linkedIn);
			// setGithub(github);
			// const userMsg = "Social Media Links have been updated";
			// addToast(userMsg);
			handleUpdate(linkedIn, github);
		}
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	return (
		<section>
			<FormsProvider>
				<SocialMediaForm
					formData={{ linkedIn, github }}
					handleSubmit={handleSubmit}
				/>
			</FormsProvider>
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

export default SocialMediaContainer;
