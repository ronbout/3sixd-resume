/* calcPercentComplete.js */
/**
 *	function to calculate the percentage of the form entry
 *	a candidate still needs to perform to create a useful
 *	resume and bio page.  it will contain the total %
 *	as well as a section by section listing of the missing data
 *
 */
export const calcPercentComplete = candInfo => {
	console.log(candInfo);
	// take section at a time, building an object with completed %
	// and remaining work to be done
	const percentComplete = {};
	const availPcts = {
		person: 20,
		summary: 15,
		highlights: 20,
		experience: 30,
		education: 10,
		socialMedia: 5
	};
	let tmpPct,
		tmpMissing,
		totPct = 0;

	// person
	tmpPct = availPcts.person;
	tmpMissing = [];
	const { person } = candInfo;
	if (!person.mobilePhone && !person.workPhone) {
		tmpPct -= 5;
		tmpMissing.push("Phone");
	}
	if (!person.municipality) {
		tmpPct -= 5;
		tmpMissing.push("City");
	}
	if (!person.website) {
		tmpPct -= 5;
		tmpMissing.push("Website");
	}
	percentComplete.person = {
		availPct: availPcts.person,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	// title/objective/summary
	tmpPct = availPcts.summary;
	tmpMissing = [];
	const { jobTitle, executiveSummary, objective } = candInfo;
	if (!jobTitle) {
		tmpPct -= 5;
		tmpMissing.push("Job Title");
	}
	if (!executiveSummary) {
		tmpPct -= 5;
		tmpMissing.push("Executive Summary");
	}
	if (!objective) {
		tmpPct -= 5;
		tmpMissing.push("Objective");
	}
	percentComplete.summary = {
		availPct: availPcts.summary,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	// highlights
	tmpPct = availPcts.highlights;
	tmpMissing = [];
	const { candidateHighlights } = candInfo;
	if (!candidateHighlights.length) {
		tmpPct = 0;
		tmpMissing.push("Highlights");
	} else {
		if (!candidateHighlights.find(h => h.skills.length)) {
			tmpPct -= 10;
			tmpMissing.push("Skills");
		}
	}
	percentComplete.highlights = {
		availPct: availPcts.highlights,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	// experience
	tmpPct = availPcts.experience;
	tmpMissing = [];
	const { experience } = candInfo;
	if (!experience.length) {
		tmpPct = 0;
		tmpMissing.push("Experience");
	} else {
		if (experience.find(ex => ex.skills.length === 0)) {
			tmpPct -= 10;
			tmpMissing.push("Skills");
		}
		if (experience.find(ex => ex.highlights.length === 0)) {
			tmpPct -= 10;
			tmpMissing.push("Highlights");
		}
	}
	percentComplete.experience = {
		availPct: availPcts.experience,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	// education
	tmpPct = availPcts.education;
	tmpMissing = [];
	const { education } = candInfo;
	if (!education.length) {
		tmpPct = 0;
		tmpMissing.push("Education");
	}
	percentComplete.education = {
		availPct: availPcts.education,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	// socialMedia
	tmpPct = availPcts.socialMedia;
	tmpMissing = [];
	const { socialMedia } = candInfo;
	if (!socialMedia.find(s => s.socialLink !== "")) {
		tmpPct = 0;
		tmpMissing.push("Social Media");
	}
	percentComplete.socialMedia = {
		availPct: availPcts.socialMedia,
		curPct: tmpPct,
		missing: tmpMissing
	};
	totPct += tmpPct;

	percentComplete.totPct = totPct;
	return percentComplete;
};
