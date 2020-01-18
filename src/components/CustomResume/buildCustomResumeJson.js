/*  buildCustomResumeJson.js */
/**
 * parms:  layout, candidate, techtagSkills, resumeSettings
 * 				 resumeSettings:  skills,	maxHi, maxJobs,	maxJobHi,	includeOnlySkills
 *
 * output:  json object that can be read by the resume builder
 */

// import { isEmptyObject, objCopy } from "assets/js/library";

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
	const candExperienceIds = chooseExperience(
		candidate.experience,
		skillList,
		maxJobs
	);
	console.log("candExperienceIds: ", candExperienceIds);

	// take the experience id's and build the highlight lists for each one,
	// return an array of objects with the experience id and the highlight id's
	const candExperience = buildExperienceObjs(
		candExperienceIds,
		candidate.experience,
		skillList,
		maxJobHi
	);
	console.log("candExperience: ", candExperience);

	/**
	 *
	 *  need to build techtagSkills based on includeOnlySkills
	 */
	const techtagIds = chooseTechtagSkills(
		includeOnlySkills,
		techtagSkills,
		skillList
	);
	console.log("techtagIds: ", techtagIds);

	const resumeJson = loadLayout(
		layout,
		candHighlights,
		candExperience,
		techtagIds
	);
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

	// console.log("retHighlights before last: ", retHighlights);
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
	const compareSkill = skill.toUpperCase().trim();
	const retArray = highlights.reduce((list, h) => {
		if (h.skills.some(s => s.name.toUpperCase().trim() === compareSkill)) {
			list.push(h.id);
		}
		return list;
	}, []);

	return retArray;
};

const checkHighlightsDesc = (highlights, skill) => {
	// returns array of highlight id's that have the skill
	const compareSkill = skill.toUpperCase().trim();
	const retArray = highlights.reduce((list, h) => {
		if (h.highlight.toUpperCase().includes(compareSkill)) {
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
	const compareSkill = skill.toUpperCase().trim();
	const retArray = experience.reduce((list, exp) => {
		if (exp.skills.some(s => s.name.toUpperCase().trim() === compareSkill)) {
			list.push(exp.id);
		}
		return list;
	}, []);

	return retArray;
};

const buildExperienceObjs = (candExpIds, candExpAll, skillList, maxJobHi) => {
	// loop through id's, get the experience and run chooseHighlights
	let candExpObj = candExpIds.map(id => {
		const exp = candExpAll.find(e => e.id === id);
		const expH = chooseHighlights(exp.highlights, skillList, maxJobHi);
		return {
			id,
			expH
		};
	});
	return candExpObj;
};

const chooseTechtagSkills = (includeOnlySkills, techtagSkills, skillList) => {
	// if not includeOnlySkills, just convert the object keys to an array
	if (!includeOnlySkills) return Object.keys(techtagSkills);
	let retTechtagIds = [];
	for (const skill of skillList) {
		// grab the techtag that includes this skill
		const fndTT = checkTechtagSkills(techtagSkills, skill);
		retTechtagIds = [...new Set(retTechtagIds.concat(fndTT))];
	}
	return retTechtagIds;
};

const checkTechtagSkills = (techtags, skill) => {
	const compareSkill = skill.toUpperCase().trim();
	// convert object techtags to array with object entries
	// make sure to sort first
	const techtagArray = Object.entries(techtags).sort((a, b) => a[0] - b[0]);
	const retArray = techtagArray.reduce((list, t) => {
		if (
			t[1].skills.some(
				s =>
					s
						.toString()
						.toUpperCase()
						.trim() === compareSkill
			)
		) {
			list.push(Number(t[0]));
		}
		return list;
	}, []);

	return retArray;
};

const loadLayout = (layout, candHighlights, candExperience, techtagIds) => {
	// loop through layout and add display info for appropriate sections
	const newSections = layout.sections.map(section => {
		switch (section.name) {
			case "hd":
				return { ...section };
			case "hi":
				return {
					...section,
					disp: candHighlights
				};
			case "ts":
				return {
					...section,
					disp: techtagIds
				};
			case "ex":
				return {
					...section,
					disp: candExperience
				};
			case "ed":
				return {
					...section
				};
			case "ct":
				return {
					section
				};
			default:
				return { ...section };
		}
	});
	return {
		...layout,
		sections: { ...newSections }
	};
};
