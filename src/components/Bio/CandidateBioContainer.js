/* CandidateBioContainer.js */
import React, { Component } from "react";
import { candidateInfo } from "./node_modules/components/CandidateProfile/dummyData";
import dataFetch from "./node_modules/assets/js/dataFetch";

import "./css/bio.css";

const API_CANDIDATES = "candidates";
const API_CANDIDATE_SKILLS = "candidate_skills/candidate_id";

class CandidateBioContainer extends Component {
	constructor(props) {
		super(props);

		// check for candidate id being passed in as url parm
		// if no such parm, then must be add mode
		const candId = props.match.params.candId;
		this.state = {
			candidate: candidateInfo,
			candidateSkills: [],
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

	loadCandidateSkills = async candId => {
		const endpoint = `${API_CANDIDATE_SKILLS}/${candId}`;
		const candidateApiInfo = await dataFetch(endpoint);
		if (candidateApiInfo.error) {
			console.log(candidateApiInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */
		} else {
			const candidateSkills = candidateApiInfo
				? candidateApiInfo
				: candidateInfo;
			this.setState({
				candidateSkills
			});
		}
	};

	render() {
		return (
			<div>
				<h1>Bio</h1>
			</div>
		);
	}
}

export default CandidateBioContainer;
