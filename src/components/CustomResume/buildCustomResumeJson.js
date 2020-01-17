/*  buildCustomResumeJson.js */
/**
 *
 * parms:  layout, candidate, techtagSkills, resumeSettings
 * 				 resumeSettings:  skills,	maxHi, maxJobs,	maxJobHi,	includeOnlySkills
 *
 * output:  json object that can be read by the resume builder
 */

import { isEmptyObject, objCopy } from "assets/js/library";

export const buildCustomResumeJson = (
	layout,
	candidate,
	techtagSkills,
	resumeSettings
) => {
	const {
		skills,
		maxHi,
		maxJobs,
		maxJobHi,
		includeOnlySkills
	} = resumeSettings;
	const skillList = skills.trim()
		? skills
				.trim()
				.split(",")
				.map(s => s.trim())
		: [];

	console.log("skillList: ", skillList);

	// first get the main candidate highlights
	const candHighlights = chooseHighlights(
		candidate.candidateHighlights,
		skillList,
		maxHi
	);
	console.log("candHighlights: ", candHighlights);

	// get the experience
	const candExperience = chooseExperience(
		candidate.experience,
		skillList,
		maxJobs
	);
	console.log("candExperience: ", candExperience);

	const resumeJson = layout;
	return resumeJson;
};

const chooseHighlights = (highlights, skillList, maxHi) => {
	let retHighlights = [];
	// at any point that the maxHi is reached, break out
	// loop through skills, find highlights with matching skills
	// add the highlights to retHighlights, and remove from tmpHighlights
	for (const skill of skillList) {
		const fndHi = checkHighlightsSkills(highlights, skill);
		retHighlights = [...new Set(retHighlights.concat(fndHi))];
		// check lenght vs maxHi
		if (retHighlights.length >= maxHi) {
			// strip off any extra
			retHighlights = retHighlights.slice(0, maxHi);
			break;
		}
	}

	// loop through the skills, find highlights that string match the skills
	for (const skill of skillList) {
		const fndHi = checkHighlightsDesc(highlights, skill);
		retHighlights = [...new Set(retHighlights.concat(fndHi))];
		// check lenght vs maxHi
		if (retHighlights.length >= maxHi) {
			// strip off any extra
			retHighlights = retHighlights.slice(0, maxHi);
			break;
		}
	}

	console.log("retHighlights before last: ", retHighlights);
	if (retHighlights.length >= maxHi) return retHighlights;
	// loop through remaining highlights until maxHi is reached or end of highlights
	for (const highlight of highlights) {
		!retHighlights.some(rh => rh === highlight.id) &&
			retHighlights.push(highlight.id);
		if (retHighlights.length >= maxHi) break;
	}
	return retHighlights;
};

const checkHighlightsSkills = (highlights, skill) => {
	// returns array of highlight id's that have the skill
	const retArray = highlights.reduce((list, h) => {
		if (
			h.skills.some(
				s => s.name.toUpperCase().trim() === skill.toUpperCase().trim()
			)
		) {
			list.push(h.id);
		}
		return list;
	}, []);

	return retArray;
};

const checkHighlightsDesc = (highlights, skill) => {
	// returns array of highlight id's that have the skill
	const retArray = highlights.reduce((list, h) => {
		if (h.highlight.toUpperCase().includes(skill.toUpperCase())) {
			list.push(h.id);
		}
		return list;
	}, []);

	return retArray;
};

const chooseExperience = (experience, skillList, maxJobs) => {
	let retExperience = [];
	// at any point that the maxJobs is reached, break out
	// loop through skills, find jobs with matching skills
	for (const skill of skillList) {
		const fndExp = checkExperienceSkills(experience, skill);
		retExperience = [...new Set(retExperience.concat(fndExp))];
		// check lenght vs maxJobs
		if (retExperience.length >= maxJobs) {
			// strip off any extra
			retExperience = retExperience.slice(0, maxJobs);
			break;
		}
	}

	// **** TODO:  do we look for string match in job summary?????
	// for (const skill of skillList) {
	// 	const fndExp = checkExperienceSkills(experience, skill);
	// 	retExperience = [...new Set(retExperience.concat(fndExp))];
	// 	// check lenght vs maxJobs
	// 	if (retExperience.length >= maxJobs) {
	// 		// strip off any extra
	// 		retExperience = retExperience.slice(0, maxJobs);
	// 		break;
	// 	}
	// }

	// loop through remaining tmpHighlights until maxHi is reached or end of tmpHighlights
	return retExperience;
};

const checkExperienceSkills = (experience, skill) => {
	// returns array of experience id's that have the skill
	const retArray = experience.reduce((list, exp) => {
		if (
			exp.skills.some(
				s => s.name.toUpperCase().trim() === skill.toUpperCase().trim()
			)
		) {
			list.push(exp.id);
		}
		return list;
	}, []);

	return retArray;
};
