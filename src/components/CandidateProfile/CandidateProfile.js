/* CandidateProfile.js */
import React, { Component } from "react";
import { ExpansionList } from "styledComponents/ExpansionPanels";
import PersonalInfo from "./PersonalInfo/";
import ObjectiveSummary from "./ObjectiveSummary";
import Highlights from "./ProfileHighlights";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import SocialMedia from "./SocialMedia";
import { candidateInfo } from "./dummyData";
import "./css/candidateProfile.css";
import { objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
import { isEqual } from "lodash";
import { calcPercentComplete } from "./calcPercentComplete";

const API_CANDIDATES = "candidates";

const emptyCompObj = {
	totPct: 0,
	person: { curPct: 0, availPct: 20 },
	summary: { curPct: 0, availPct: 15 },
	highlights: { curPct: 0, availPct: 20 },
	experience: { curPct: 0, availPct: 30 },
	education: { curPct: 0, availPct: 10 },
	socialMedia: { curPct: 0, availPct: 5 }
};

class CandidateProfile extends Component {
	constructor(props) {
		super(props);

		// check for candidate id being passed in as url parm
		// if no such parm, then must be add mode
		const candId = props.match.params.candId;
		this.state = {
			formFields: candidateInfo,
			candId,
			compObj: emptyCompObj
		};
		this.state.origForm = objCopy(this.state.formFields);
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId);
	}

	shouldComponentUpdate(nextProps, nextState) {
		// the section components should not re-render
		// when they pass update info up to top state
		return (
			!isEqual(nextProps, this.props) ||
			isEqual(this.state.formFields, candidateInfo)
		);
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
		} else {
			const formFields = candidateApiInfo ? candidateApiInfo : candidateInfo;
			const compObj = calcPercentComplete(formFields);
			console.log(compObj);
			this.setState({
				formFields,
				origForm: objCopy(formFields),
				compObj
			});
		}
	};

	handleUpdate = updateObj => {
		// this does not really need to be set as once it passes
		// off the data to the sections, it is no longer involved
		// turn it off to stop the children from re-rendering
		/*
		const newFormFields = {
			...this.state.formFields,
			...updateObj
		};

		this.setState({ formFields: newFormFields });
		*/
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
						compObj={this.state.compObj}
					/>
					<ObjectiveSummary
						jobTitle={this.state.formFields.jobTitle}
						objective={this.state.formFields.objective}
						executiveSummary={this.state.formFields.executiveSummary}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
						compObj={this.state.compObj.summary}
					/>
					<Highlights
						highlights={this.state.formFields.candidateHighlights}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
						compObj={this.state.compObj.highlights}
					/>
					<Experience
						experience={this.state.formFields.experience}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
						compObj={this.state.compObj.experience}
					/>
					<Education
						education={this.state.formFields.education}
						handleUpdate={this.handleUpdate}
						candId={this.state.candId}
						compObj={this.state.compObj.education}
					/>
					<Certifications
						certifications={this.state.formFields.certifications}
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
						compObj={this.state.compObj.socialMedia}
					/>
				</ExpansionList>
			</div>
		);
	}
}

export default CandidateProfile;
