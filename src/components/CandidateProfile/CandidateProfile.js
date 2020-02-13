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

import "./css/candidateProfile.css";

const API_CANDIDATES = "candidates";

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
			errMsg
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
			/**
			 *
			 *  TODO: add error message
			 *
			 */
		} else {
			const formFields = candidateApiInfo ? candidateApiInfo : candidateInfo;
			this.setState({
				formFields,
				origForm: objCopy(formFields)
			});
		}
	};

	handleUpdate = updateObj => {
		// this will not need to pass the info back down as
		// the sections contain the latest info.  But, it is
		// needed to update the compMsg
		// const newFormFields = {
		// 	...this.state.formFields,
		// 	...updateObj
		// };
		/* 
		const formFields = {
			...objCopy(this.state.formFields),
			...updateObj
		};

		const compObj = calcPercentComplete(formFields);
		const compMsg = buildCompMsg(compObj);
		this.setState({ formFields, compObj, compMsg });
		 */
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
											handleUpdate={this.handleUpdate}
											candId={this.state.candId}
										/>
										<ObjectiveSummary
											jobTitle={this.state.formFields.jobTitle}
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
										<Certifications
											certifications={this.state.formFields.certifications}
											handleUpdate={this.handleUpdate}
											candId={this.state.candId}
										/>
										<SocialMedia
											linkedInLink={
												socialMedia[
													socialMedia.findIndex(
														sm => sm.socialType === "LinkedIn"
													)
												].socialLink
											}
											githubLink={
												socialMedia[
													socialMedia.findIndex(
														sm => sm.socialType === "Github"
													)
												].socialLink
											}
											handleUpdate={this.handleUpdate}
											candId={this.state.candId}
										/>
									</ExpansionList>
								</div>
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
