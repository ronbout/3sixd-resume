import { objCopy } from "assets/js/library";

/*  buildCustomResumeJson.js */
/**
 * parms:  layout, candidate, techtagSkills, resumeSettings
 * 				 resumeSettings:  skills,	maxEntries	includeOnlySkills
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
		maxEntries,
		includeOnlySkills,
		includeObjective,
		includeProfSummary
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
		maxEntries.highlights,
		includeOnlySkills.highlights
	);
	console.log("candHighlights: ", candHighlights);

	// get the experience
	const candExperienceIds = chooseSectionIdsBySkills(
		candidate.experience,
		skillList,
		maxEntries.jobs,
		includeOnlySkills.jobs
	);
	console.log("candExperienceIds: ", candExperienceIds);

	// get the education
	const candEducation = chooseSectionIdsBySkills(
		candidate.education,
		skillList,
		maxEntries.education,
		includeOnlySkills.education
	);
	console.log("candEducation: ", candEducation);

	// get the certifications
	const candCertification = chooseSectionIdsBySkills(
		candidate.certifications,
		skillList,
		maxEntries.certifications,
		includeOnlySkills.certifications
	);
	console.log("candCertification: ", candCertification);

	// take the experience id's and build the highlight lists for each one,
	// return an array of objects with the experience id and the highlight id's
	const candExperience = buildExperienceObjs(
		candExperienceIds,
		candidate.experience,
		skillList,
		maxEntries.jobHighlights,
		includeOnlySkills.jobHighlights
	);
	console.log("candExperience: ", candExperience);

	const techtagIds = chooseTechtagSkills(
		includeOnlySkills.techtags,
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
		techtagIds,
		includeObjective,
		includeProfSummary
	);
	return resumeJson;
};

const chooseHighlights = (
	highlights,
	skillList,
	maxHi,
	includeOnlySkills = false
) => {
	// get the highlights id's by skillList first
	// then add by highlight string match and any remaining
	let retHighlights = chooseSectionIdsBySkills(
		highlights,
		skillList,
		maxHi,
		includeOnlySkills
	);
	console.log("retHighlights: ", retHighlights);

	// loop through the skills, find highlights that string match the skills
	for (const skill of skillList) {
		const fndHi = checkHighlightsDesc(highlights, skill);
		console.log("highlight string comp loop (skill, fndHi): ", skill, fndHi);
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
	return includeOnlySkills
		? retHighlights
		: getRemainingSection(highlights, retHighlights, maxHi);
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

const buildExperienceObjs = (
	candExpIds,
	candExpAll,
	skillList,
	maxJobHi,
	includeOnlySkills = false
) => {
	// loop through id's, get the experience and run chooseHighlights
	let candExpObj = candExpIds.map(id => {
		const exp = candExpAll.find(e => e.id === id);
		const expH = chooseHighlights(
			exp.highlights,
			skillList,
			maxJobHi,
			includeOnlySkills
		);
		return {
			id,
			expH
		};
	});
	return candExpObj;
};

const chooseTechtagSkills = (includeOnlySkills, techtagSkills, skillList) => {
	let retTechtagIds = [];
	for (const skill of skillList) {
		// grab the techtag that includes this skill
		const fndTT = checkTechtagSkills(techtagSkills, skill);
		retTechtagIds = [...new Set(retTechtagIds.concat(fndTT))];
	}

	// loop through remaining section until max is reached or end
	return includeOnlySkills
		? retTechtagIds
		: getRemainingTechtags(techtagSkills, retTechtagIds);
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

const getRemainingTechtags = (techtags, curIds) => {
	// copy curIds into separate array so that we don't change original
	let retIds = objCopy(curIds);
	const techtagArray = Object.entries(techtags).sort((a, b) => a[0] - b[0]);
	for (const tt of techtagArray) {
		!retIds.some(rI => rI === Number(tt[0])) && retIds.push(Number(tt[0]));
	}
	return retIds;
};

const loadLayout = (
	origLayout,
	candHighlights,
	candExperience,
	candEducation,
	candCertification,
	techtagIds,
	includeObjective,
	includeProfSummary
) => {
	let layout = objCopy(origLayout);
	// remove objective and profSummary if not included
	!includeObjective && removeLayoutSection("ob", layout);
	console.log("post obj test: ", layout);
	!includeProfSummary && removeLayoutSection("ps", layout);
	console.log("post summary test: ", layout);

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

const removeLayoutSection = (sectCode, layout) => {
	const ndx = layout.sections.findIndex(s => s.name === sectCode);
	layout.sections.splice(ndx, 1);
	return layout;
};
