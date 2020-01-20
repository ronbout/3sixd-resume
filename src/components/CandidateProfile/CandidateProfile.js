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
import { objCopy, isEmptyObject } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
// import { isEqual } from "lodash";
import { calcPercentComplete } from "./calcPercentComplete";
import { UserContext } from "components/UserProvider";

const API_CANDIDATES = "candidates";

const emptyCompObj = {
	totPct: 0,
	person: { curPct: 0, availPct: 20, missing: [] },
	summary: { curPct: 0, availPct: 15, missing: [] },
	highlights: { curPct: 0, availPct: 20, missing: [] },
	experience: { curPct: 0, availPct: 30, missing: [] },
	education: { curPct: 0, availPct: 10, missing: [] },
	socialMedia: { curPct: 0, availPct: 5, missing: [] }
};

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
			compObj: emptyCompObj,
			compMsg: {},
			errMsg
		};
		this.state.origForm = objCopy(this.state.formFields);
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId);
	}

	/*
	shouldComponentUpdate(nextProps, nextState) {
		// the section components should not re-render
		// when they pass update info up to top state
		return (
			!isEqual(nextProps, this.props) ||
			isEqual(this.state.formFields, candidateInfo)
		);
	}
	*/

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
			const compMsg = this.buildCompMsg(compObj);
			this.setState({
				formFields,
				origForm: objCopy(formFields),
				compObj,
				compMsg
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

		const formFields = {
			...objCopy(this.state.formFields),
			...updateObj
		};

		const compObj = calcPercentComplete(formFields);
		const compMsg = this.buildCompMsg(compObj);
		this.setState({ formFields, compObj, compMsg });
	};

	buildCompMsg = compObj => {
		/**
		 *
		 *  will need a way to
		 * 1)  recalc the percentage
		 * 2) rediisplay msg I am building in this routine
		 * 3) redisplay the progress bar
		 *
		 *
		 * so, must send info back up on save w/o redrawing
		 * all the components.  just change the state of the
		 * % completed.
		 *
		 */
		let compMsg = [];

		if (compObj.person.missing.length) {
			compMsg.push(
				<li key="person">
					Add the following fields to Personal Info: &nbsp;
					{compObj.person.missing.join(", ")}
				</li>
			);
		}

		if (compObj.summary.missing.length) {
			compMsg.push(
				<li key="summary">
					Add the following fields to Professional Info: &nbsp;
					{compObj.summary.missing.join(", ")}
				</li>
			);
		}

		if (compObj.highlights.missing.includes("Highlights")) {
			compMsg.push(<li key="highlights">Add Career Highlights</li>);
		}
		if (compObj.highlights.missing.includes("Skills")) {
			compMsg.push(
				<li key="highlight-skills">Attach Skills to Career Highlights</li>
			);
		}

		if (compObj.experience.missing.includes("Experience")) {
			compMsg.push(<li key="experience">Add Experience</li>);
		}
		if (compObj.experience.missing.includes("Skills")) {
			compMsg.push(
				<li key="experience-skills">Attach Skills to each Experience</li>
			);
		}
		if (compObj.experience.missing.includes("Highlights")) {
			compMsg.push(
				<li key="experience-highlights">
					Attach Highlights to each Experience
				</li>
			);
		}

		if (compObj.education.missing.includes("Education")) {
			compMsg.push(<li key="education">Add Education</li>);
		}

		if (compObj.socialMedia.missing.includes("Social Media")) {
			compMsg.push(
				<li key="socialmedia">Add LinkedIn and/or Github social media links</li>
			);
		}

		return compMsg;
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
					<React.Fragment>
						{!isEmptyObject(this.state.compMsg) && (
							<div className="comp-msg">
								<p
									style={{
										fontSize: "22px",
										lineHeight: "26px",
										fontWeight: "bold"
									}}
								>
									Your profile is incomplete. With a complete profile, our AI
									can generate an optimal resume based on particular job
									requirements
								</p>
								<ol>{this.state.compMsg.map(m => m)}</ol>
							</div>
						)}
						<div className="candidate-profile">
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
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

export default CandidateProfile;
