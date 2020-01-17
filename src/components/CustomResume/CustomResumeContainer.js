/* CustomResumeContainer.js */
import React, { Component } from "react";
import CustomResume from "./CustomResume";
import { candidateInfo } from "components/CandidateProfile/dummyData";
import dataFetch from "assets/js/dataFetch";

const API_CANDIDATES = "candidates";
const API_CANDIDATE_SKILLS = "candidate_skills/candidate_id";

class CustomResumeContainer extends Component {
	constructor(props) {
		super(props);

		// check for candidate id being passed in as url parm
		// if no such parm, then must be add mode
		const candId = props.match.params.candId;
		this.state = {
			candidate: candidateInfo,
			techtagSkills: [],
			candId
		};
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId) &&
			this.loadCandidateSkills(this.state.candId);
	}

	loadCandidateInfo = async candId => {
		const endpoint = `${API_CANDIDATES}/${candId}`;
		const candidateApiInfo = await dataFetch(endpoint);
		if (candidateApiInfo.error) {
			console.log(candidateApiInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */

			return false;
		} else {
			const candidate = candidateApiInfo ? candidateApiInfo : candidateInfo;
			this.setState({
				candidate
			});
		}
		return true;
	};

	buildTechSkils = candidateSkillInfo => {
		const techSkills = candidateSkillInfo.reduce((techArray, skill) => {
			if (!skill.resumeTechtagId) return techArray;
			const tagId = skill.resumeTechtagId;
			if (!techArray[tagId])
				techArray[tagId] = { name: skill.resumeTechtagName, skills: [] };
			techArray[tagId].skills.push(skill.skillName);
			return techArray;
		}, {});
		return techSkills;
	};

	loadCandidateSkills = async candId => {
		const endpoint = `${API_CANDIDATE_SKILLS}/${candId}`;
		const candidateSkillInfo = await dataFetch(endpoint);
		if (candidateSkillInfo.error) {
			console.log(candidateSkillInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */
		} else {
			const techtagSkills = this.buildTechSkils(candidateSkillInfo.skills);
			this.setState({
				techtagSkills
			});
		}
	};

	render() {
		return (
			<CustomResume
				candidate={this.state.candidate}
				techtagSkills={this.state.techtagSkills}
			/>
		);
	}
}

export default CustomResumeContainer;
