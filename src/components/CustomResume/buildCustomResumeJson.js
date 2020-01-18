import { objCopy } from "assets/js/library";

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
		maxEds,
		maxCerts,
		includeOnlySkillsTechtags,
		includeOnlySkillsJobs,
		includeOnlySkillsEds,
		includeOnlySkillsCerts
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
	const candExperienceIds = chooseSectionIdsBySkills(
		candidate.experience,
		skillList,
		maxJobs,
		includeOnlySkillsJobs
	);
	console.log("candExperienceIds: ", candExperienceIds);

	// get the education
	const candEducation = chooseSectionIdsBySkills(
		candidate.education,
		skillList,
		maxEds,
		includeOnlySkillsEds
	);
	console.log("candEducation: ", candEducation);

	// get the certifications
	const candCertification = chooseSectionIdsBySkills(
		candidate.certifications,
		skillList,
		maxCerts,
		includeOnlySkillsCerts
	);
	console.log("candCertification: ", candCertification);

	// take the experience id's and build the highlight lists for each one,
	// return an array of objects with the experience id and the highlight id's
	const candExperience = buildExperienceObjs(
		candExperienceIds,
		candidate.experience,
		skillList,
		maxJobHi
	);
	console.log("candExperience: ", candExperience);

	const techtagIds = chooseTechtagSkills(
		includeOnlySkillsTechtags,
		techtagSkills,
		skillList
	);
	console.log("techtagIds: ", techtagIds);

	const resumeJson = loadLayout(
		layout,
		candHighlights,
		candExperience,
		candEducation,
		candCertification,
		techtagIds
	);
	return resumeJson;
};

const chooseHighlights = (highlights, skillList, maxHi) => {
	// get the highlights id's by skillList first
	// then add by highlight string match and any remaining
	let retHighlights = chooseSectionIdsBySkills(highlights, skillList, maxHi);

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
	return getRemainingSection(highlights, retHighlights, maxHi);
};

const getRemainingSection = (section, curIds, maxIds) => {
	// copy curIds into separate array so that we don't change original
	let retIds = objCopy(curIds);
	for (const item of section) {
		!retIds.some(rh => rh === item.id) && retIds.push(item.id);
		if (retIds.length >= maxIds) break;
	}
	return retIds;
};

const checkHighlightsDesc = (highlights, skill) => {
	// returns array of highlight id's that have the skill
	const compareSkill = skill
		.toString()
		.toUpperCase()
		.trim();
	const retArray = highlights.reduce((list, h) => {
		if (h.highlight.toUpperCase().includes(compareSkill)) {
			list.push(h.id);
		}
		return list;
	}, []);

	return retArray;
};

const chooseSectionIdsBySkills = (
	section,
	skillList,
	maxIds,
	includeOnlySkills = false
) => {
	// used for experience, education, certification
	let retSectionIds = [];
	// at any point that the maxIds is reached, break out
	// loop through skills, find jobs with matching skills
	for (const skill of skillList) {
		const fndExp = checkSectionBySkill(section, skill);
		retSectionIds = [...new Set(retSectionIds.concat(fndExp))];
		// check lenght vs maxIds
		if (retSectionIds.length >= maxIds) {
			// strip off any extra
			retSectionIds = retSectionIds.slice(0, maxIds);
			break;
		}
	}

	// loop through remaining section until max is reached or end
	return includeOnlySkills
		? retSectionIds
		: getRemainingSection(section, retSectionIds, maxIds);
};

const checkSectionBySkill = (section, skill) => {
	// returns array of section id's that have the skill
	// used for highlights, experience, education
	const compareSkill = skill
		.toString()
		.toUpperCase()
		.trim();
	const retArray = section.reduce((list, item) => {
		if (
			item.skills.some(
				s =>
					s.name
						.toString()
						.toUpperCase()
						.trim() === compareSkill
			)
		) {
			list.push(item.id);
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
	const compareSkill = skill
		.toString()
		.toUpperCase()
		.trim();
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

const loadLayout = (
	layout,
	candHighlights,
	candExperience,
	candEducation,
	candCertification,
	techtagIds
) => {
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
					...section,
					disp: candEducation
				};
			case "ct":
				return {
					...section,
					disp: candCertification
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
