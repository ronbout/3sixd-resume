/* handleAddSkill.js */
import dataFetch from "assets/js/dataFetch";

const handleAddSkill = async (
	skills,
	skillInfo,
	candId,
	handleSkillsChange
) => {
	// check for duplicate
	if (
		skills.some((skill) => {
			return skill.id === skillInfo.id;
		})
	)
		return;
	/**
	 *  run api call to see if this skill is already
	 *  part of the candidate's list.  if so, attach
	 *  the candidate_skills id.  otherwise, just leave
	 *  as an empty string.
	 */
	const csId = await getCandidateSkillId(candId, skillInfo.id);
	skillInfo.candidateSkillId = csId;
	let tmpSkills = skills.slice();
	tmpSkills.push(skillInfo);
	handleSkillsChange(tmpSkills);
};

const getCandidateSkillId = async (candId, skillId) => {
	const csApiUrl = `/candidate_skills/skill_candidate_id/${skillId}`;
	const queryStr = `&candidateId=${candId}`;
	let csId = "";
	let result = await dataFetch(csApiUrl, queryStr);
	if (!result.error) {
		csId = result.id;
	}
	return csId;
};

export default handleAddSkill;
