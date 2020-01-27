/* buildCompMsg.js */
import React from "react";

export const buildCompMsg = compObj => {
	/**
	 *
	 *  will need a way to
	 * 1)  recalc the percentage
	 * 2) rediisplay msg I am building in this routine
	 * 3) redisplay the progress bar
	 *
	 *
	 * so, must send info back up on save w/o redrawing
	 * all the components.  just change the state of the
	 * % completed.
	 *
	 */
	let compMsg = [];

	if (compObj.person.missing.length) {
		compMsg.push(
			<li key="person">
				Add the following fields to Personal Info: &nbsp;
				{compObj.person.missing.join(", ")}
			</li>
		);
	}

	if (compObj.summary.missing.length) {
		compMsg.push(
			<li key="summary">
				Add the following fields to Professional Info: &nbsp;
				{compObj.summary.missing.join(", ")}
			</li>
		);
	}

	if (compObj.highlights.missing.includes("Highlights")) {
		compMsg.push(<li key="highlights">Add Career Highlights</li>);
	}
	if (compObj.highlights.missing.includes("Skills")) {
		compMsg.push(
			<li key="highlight-skills">Attach Skills to Career Highlights</li>
		);
	}

	if (compObj.experience.missing.includes("Experience")) {
		compMsg.push(<li key="experience">Add Experience</li>);
	}
	if (compObj.experience.missing.includes("Skills")) {
		compMsg.push(
			<li key="experience-skills">Attach Skills to each Experience</li>
		);
	}
	if (compObj.experience.missing.includes("Highlights")) {
		compMsg.push(
			<li key="experience-highlights">Attach Highlights to each Experience</li>
		);
	}

	if (compObj.education.missing.includes("Education")) {
		compMsg.push(<li key="education">Add Education</li>);
	}

	if (compObj.socialMedia.missing.includes("Social Media")) {
		compMsg.push(
			<li key="socialmedia">Add LinkedIn and/or Github social media links</li>
		);
	}

	return compMsg;
};
