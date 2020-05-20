import React, { useState } from "react";
import Chip from "styledComponents/Chip";
import handleAddSkill from "./handleAddSkill";
import SkillSearchContainer from "components/search/SkillSearch/";
import MakePopup from "components/hoc/MakePopup";

import "./css/skillList.css";

const SkillSearchPopup = MakePopup(
	SkillSearchContainer,
	{
		right: "60px",
		top: "152px",
		width: "344px",
		borderRadius: "20px",
	},
	true
);

const SkillList = ({
	skills,
	candId,
	handleSkillsChange,
	editFlag,
	dispSearch = true,
}) => {
	const [dispSkillSearchFlag, setDispSkillSearchFlag] = useState(dispSearch);
	const [skillDrag, setSkillDrag] = useState(false);

	const handleOpenSkillSearch = () => {
		setDispSkillSearchFlag(true);
	};

	const callHandleAddSkill = async (skillInfo) => {
		// need to add some parms and call as outside fn
		// as it needs to be reusable to other components
		handleAddSkill(skills, skillInfo, candId, handleSkillsChange);
	};

	const handleDelSkill = (ndx) => {
		let tmpSkills = skills.slice();
		tmpSkills.splice(ndx, 1);
		handleSkillsChange(tmpSkills);
	};

	const handleCloseSkillSearch = () => {
		setDispSkillSearchFlag(false);
	};

	const handleSkillStartDrag = (skillInfo) => {
		setSkillDrag(skillInfo);
	};

	const handleSkillDrop = (event) => {
		event.preventDefault && event.preventDefault();
		// console.log(
		// 	"drop event get data json/skill: ",
		// 	event.dataTransfer.getData("json/skill")
		// );
		skillDrag && callHandleAddSkill(skillDrag);
	};

	const handleDragOver = (event) => {
		event.preventDefault && event.preventDefault();
		event.dataTransfer.dropEffect = "move";
		return false;
	};

	const handleDragEnd = (event) => {
		if (skillDrag) {
			// we are either dragging the entire skill search component
			// or just a single skill to add.  This will fire after the
			// onDrop, so if it was a skill, turn skill drag off and return
			setSkillDrag(false);
			return;
		}
	};

	return (
		<div
			className="skills-container"
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDrop={handleSkillDrop}
		>
			{/*editFlag ? <p>Edit Skills</p> : <p>Skills</p>*/}

			<div className="skills-list">
				{skills &&
					skills.map((skill, ndx) => {
						return (
							<Chip
								id={skill.id}
								key={skill.id}
								label={skill.name}
								removable={editFlag}
								onClick={() => handleDelSkill(ndx)}
							/>
						);
					})}
				{editFlag && !dispSkillSearchFlag && (
					<React.Fragment>
						<Chip
							id="btn-add-skill"
							label="Add Skill"
							className="chip-btn"
							onClick={handleOpenSkillSearch}
						/>
					</React.Fragment>
				)}
			</div>
			{dispSkillSearchFlag && dispSkillSearch()}
		</div>
	);

	function dispSkillSearch() {
		return (
			<SkillSearchPopup
				editMode="1"
				searchButton="Add Skill"
				forceRefresh={false}
				handleSkillSelect={callHandleAddSkill}
				handleSkillStartDrag={handleSkillStartDrag}
				closeBtn={handleCloseSkillSearch}
			/>
		);
	}
};

export default SkillList;
