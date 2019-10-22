import React, { Component } from "react";

import { ExpansionList } from "react-md";
import PersonalInfo from "./PersonalInfo/";
import ObjectiveSummary from "./ObjectiveSummary";
import Highlights from "./ProfileHighlights";
import Experience from "./Experience";
import Education from "./Education";
import SocialMedia from "./SocialMedia";
import { candidateInfo } from "./dummyData";
import "./css/candidateProfile.css";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";

const API_CANDIDATES = "candidates";

class CandidateProfile extends Component {
	constructor(props) {
		super(props);

		// check for candidate id being passed in as url parm
		// if no such parm, then must be add mode
		const candId = props.match.params.candId;
		this.state = {
			apiBase: window.apiUrl,
			formFields: candidateInfo,
			candId
		};
		this.state.origForm = objCopy(this.state.formFields);
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId);
	}
	loadCandidateInfo = async candId => {
		const endpoint = `${API_CANDIDATES}/${candId}`;
		const candidateApiInfo = await dataFetch(endpoint);
		if (candidateApiInfo.error) {
			console.log(candidateApiInfo);
		} else {
			const formFields = candidateApiInfo ? candidateApiInfo : candidateInfo;
			this.setState({
				formFields,
				origForm: objCopy(formFields)
			});
		}
	};

	handleUpdate = updateObj => {
		this.setState({
			formFields: {
				...this.state.formFields,
				...updateObj
			}
		});
	};

	render() {
		const socialMedia = this.state.formFields.socialMedia;
		return (
			<div className="candidate-profile">
				<h1>Candidate Profile Page</h1>
				<ExpansionList className="md-cell md-cell--12">
					<PersonalInfo
						person={this.state.formFields.person}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
					<ObjectiveSummary
						objective={this.state.formFields.objective}
						executiveSummary={this.state.formFields.executiveSummary}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
					<Highlights
						highlights={this.state.formFields.candidateHighlights}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
					<Experience
						experience={this.state.formFields.experience}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
					<Education
						education={this.state.formFields.education}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
					<SocialMedia
						linkedInLink={
							socialMedia[
								socialMedia.findIndex(sm => sm.socialType === "LinkedIn")
							].socialLink
						}
						githubLink={
							socialMedia[
								socialMedia.findIndex(sm => sm.socialType === "Github")
							].socialLink
						}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
					/>
				</ExpansionList>
			</div>
		);
	}
}

export default CandidateProfile;
