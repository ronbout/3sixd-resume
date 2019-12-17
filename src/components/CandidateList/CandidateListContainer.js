/* CandidateListContainer.js */
import React, { Component } from "react";
import CandidateList from "./CandidateList";
import dataFetch from "assets/js/dataFetch";

import "./css/candidateList.css";

const API_CANDIDATES = "candidates";

class CandidateListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			candidates: []
		};
	}

	componentDidMount() {
		this.loadCandidatesInfo();
	}

	loadCandidatesInfo = async () => {
		const endpoint = API_CANDIDATES;
		const candidateListInfo = await dataFetch(endpoint);
		if (candidateListInfo.error) {
			console.log(candidateListInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */

			return false;
		} else {
			const candidates = candidateListInfo ? candidateListInfo : [];
			this.setState({
				candidates
			});
		}
		return true;
	};

	render() {
		return <CandidateList candidates={this.state.candidates} />;
	}
}

export default CandidateListContainer;
