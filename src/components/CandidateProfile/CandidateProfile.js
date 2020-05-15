/* CandidateProfile.js */
import React, { Component } from "react";
import { ExpansionList } from "styledComponents/ExpansionPanels";
import IncompleteInfoMsg from "./IncompleteInfoMsg";
import PersonalInfo from "./PersonalInfo/";
import ObjectiveSummary from "./ObjectiveSummary";
import Highlights from "./ProfileHighlights";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import SocialMedia from "./SocialMedia";
import { candidateInfo } from "./dummyData";
import { objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
import { UserContext } from "components/UserProvider";
import { CompObjProvider } from "./CompObjContext";
import SkillSearchContainer from "components/search/SkillSearch/";
import MakePopup from "components/hoc/MakePopup";

import "./css/candidateProfile.css";

const API_CANDIDATES = "candidates";

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

class CandidateProfile extends Component {
	static contextType = UserContext;
	constructor(props, context) {
		super(props, context);

		// check for candidate id being passed in as url parm
		const candId = Number(props.match.params.candId);
		// if candId from url is different from the userInfo candId, make sure
		// that the security level is > 1 or just display warning.
		let authValue = this.context;
		let errMsg = "";
		if (
			!authValue.userInfo ||
			(candId !== authValue.userInfo.candidateId &&
				authValue.userInfo.securityLevel !== 10)
		) {
			errMsg = (
				<span>
					Not a valid Candidate Id
					<br />
					or You do not have permission to access this Candidate
				</span>
			);
		}

		this.state = {
			formFields: candidateInfo,
			candId,
			errMsg,
		};
		this.state.origForm = objCopy(this.state.formFields);
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId);
	}

	loadCandidateInfo = async (candId) => {
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
			this.setState({
				formFields,
				origForm: objCopy(formFields),
			});
		}
	};

	render() {
		const socialMedia = this.state.formFields.socialMedia;
		return (
			<React.Fragment>
				{this.state.errMsg ? (
					<h1 style={{ marginTop: "12px", textAlign: "center" }}>
						{this.state.errMsg}
					</h1>
				) : (
					<CompObjProvider>
						{this.state.formFields.id ? (
							<React.Fragment>
								<IncompleteInfoMsg candidateInfo={this.state.formFields} />
								<div className="candidate-profile">
									<ExpansionList className="md-cell md-cell--12">
										<PersonalInfo
											person={this.state.formFields.person}
											candId={this.state.candId}
										/>
										<ObjectiveSummary
											jobTitle={this.state.formFields.jobTitle}
											objective={this.state.formFields.objective}
											executiveSummary={this.state.formFields.executiveSummary}
											candId={this.state.candId}
										/>
										<Highlights
											highlights={this.state.formFields.candidateHighlights}
											candId={this.state.candId}
										/>
										<Experience
											experience={this.state.formFields.experience}
											candId={this.state.candId}
										/>
										<Education
											education={this.state.formFields.education}
											candId={this.state.candId}
										/>
										<Certifications
											certifications={this.state.formFields.certifications}
											candId={this.state.candId}
										/>
										<SocialMedia
											linkedInLink={
												socialMedia[
													socialMedia.findIndex(
														(sm) => sm.socialType === "LinkedIn"
													)
												].socialLink
											}
											githubLink={
												socialMedia[
													socialMedia.findIndex(
														(sm) => sm.socialType === "Github"
													)
												].socialLink
											}
											candId={this.state.candId}
										/>
									</ExpansionList>
								</div>
								<SkillSearchPopup
									editMode="1"
									searchButton="Add Skill"
									forceRefresh={false}
									handleSkillSelect={() => null}
									handleSkillStartDrag={() => null}
									closeBtn={() => null}
									hideButtons={true}
								/>
							</React.Fragment>
						) : (
							<h2>Loading Candidate data...</h2>
						)}
					</CompObjProvider>
				)}
			</React.Fragment>
		);
	}
}

export default CandidateProfile;
