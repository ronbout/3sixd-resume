/* CandidateListContainer.js */
import React, { Component } from "react";
import CandidateList from "./CandidateList";
import CandidateListFilter from "./CandidateListFilter";
import dataFetch from "assets/js/dataFetch";

import "./css/candidateList.css";

const API_CANDIDATES = "candidates";

class CandidateListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			candidates: [],
			filters: {}
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
			const candidates = candidateListInfo.map(candidate => {
				let { edSkillName, certSkillName, jobSkillName } = candidate;
				// add a comma-delimited list of all skills for filtering
				edSkillName = edSkillName ? edSkillName : [];
				certSkillName = certSkillName ? certSkillName : [];
				jobSkillName = jobSkillName ? jobSkillName : [];
				const skillList = edSkillName
					.concat(certSkillName, jobSkillName)
					.join(",");
				return { ...candidate, skillList };
			});
			this.setState({
				candidates
			});
		}
		return true;
	};

	filterList = filters => {
		console.log("filter List: ", filters);
		this.setState({ filters });
	};

	testSkillsFilter = (skillFilters, skillList) => {
		return skillFilters
			.trim()
			.split(",")
			.reduce((flg, sFilter) => {
				console.log("filter: ", flg, sFilter);
				if (sFilter.trim() && !skillList.includes(sFilter)) return false;
				return flg;
			}, true);
	};

	render() {
		// filter List
		const filteredList = this.state.candidates.filter(c => {
			const { name, title, skills } = this.state.filters;
			if (
				name &&
				!c.personFormattedName.toLowerCase().includes(name.toLowerCase())
			)
				return false;
			if (title && !c.jobTitle.toLowerCase().includes(title.toLowerCase()))
				return false;
			if (
				skills &&
				!this.testSkillsFilter(skills.toLowerCase(), c.skillList.toLowerCase())
			)
				return false;

			return true;
		});
		return (
			<React.Fragment>
				<div className="clist-heading">
					<h1>Candidate Listing</h1>
				</div>
				<div className="clist-section">
					<div className="clist-filter">
						<CandidateListFilter filterList={this.filterList} />
					</div>
					<div className="clist-display">
						<CandidateList candidates={filteredList} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CandidateListContainer;
