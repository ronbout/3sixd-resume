import React, { useState, useEffect } from "react";

import TechtagSelectContainer from "../TechtagSelect/";
import SelectList from "../SelectList/";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";

const CandidateSkillsSkillTab = props => {
	const [skillNdx, setSkillNdx] = useState(0);
	const [skillList, setSkillList] = useState(
		objCopy(props.candidateSkills.skills)
	);
	const [tagList, setTagList] = useState([]);

	useEffect(() => {
		setSkillList(objCopy(props.candidateSkills.skills));
		props.candidateSkills &&
			props.candidateSkills.skills[skillNdx].skillId &&
			getTagsPerSkill(props.candidateSkills.skills[skillNdx].skillId);
	}, [props.candidateSkills, skillNdx]);

	const handleSkillSelect = ndx => {
		setSkillNdx(ndx);
		getTagsPerSkill(skillList[ndx].skillId);
	};

	const getTagsPerSkill = async skillId => {
		const endpoint = `skill_techtags/${skillId}`;
		let result = await dataFetch(endpoint);
		if (result.error) {
			console.log(result);
		} else {
			setTagList(result);
		}
	};

	const removeTechtag = () => {
		let tmpSkills = objCopy(skillList);
		tmpSkills[skillNdx].resumeTechtagId = "";
		tmpSkills[skillNdx].resumeTechtagName = "";
		tmpSkills[skillNdx].resumeTechtagDescription = "";
		setSkillList(tmpSkills);
	};

	const handleSelectTag = tag => {
		console.log("selected tag: ", tag);
		let tmpSkills = objCopy(skillList);
		tmpSkills[skillNdx].resumeTechtagId = tag.id;
		tmpSkills[skillNdx].resumeTechtagName = tag.name;
		tmpSkills[skillNdx].resumeTechtagDescription = tag.description;
		setSkillList(tmpSkills);
	};

	const handleUpdate = () => {
		props.handleUpdate(skillList);
	};

	const handleTagStartDrag = () => {
		// do nothing...drag not currently supported
	};

	const dataList = skillList.map(skill => {
		return { display: skill.skillName, hover: skill.skillDescription };
	});
	return (
		<div>
			<h1>Candidate Skills</h1>
			<div className="candidate-skill-tab-container">
				<div className="candidate-skill">
					<label>Selected Skill:</label>
					<input type="text" disabled value={skillList[skillNdx].skillName} />
					<p>Double-click from list below to change Skill</p>
					<SelectList dataList={dataList} handleRowSelect={handleSkillSelect} />
				</div>
				<div className="candidate-skill-techtag">
					<p>Resume Techtag</p>
					<div>
						<input
							type="text"
							disabled
							value={skillList[skillNdx].resumeTechtagName || "none selected"}
						/>
						<button
							type="button"
							className="btn btn-danger"
							title="Remove Techtag"
							onClick={removeTechtag}
						>
							X
						</button>
					</div>
					<TechtagSelectContainer
						skillTagsList={[]}
						handleAddTag={handleSelectTag}
						handleTagStartDrag={handleTagStartDrag}
						tagOptions={tagList}
						hideFilter={true}
					/>
				</div>
			</div>
			<button type="button" className="skill-update" onClick={handleUpdate}>
				Update Skill
			</button>
		</div>
	);
};

export default CandidateSkillsSkillTab;
