import React, { useState } from "react";
import { useForm } from "components/forms/useForm";
import {
	InpString,
	InpDate,
	InpTextAsNumber,
	InpPhone,
	InpRadio,
	Form
} from "components/forms/formInputs";
import Button from "styledComponents/Button";
import Checkbox from "styledComponents/Checkbox";
import { FontIcon } from "styledComponents/FontIcon";
import {
	ExpansionList,
	ExpansionPanel
} from "styledComponents/ExpansionPanels";
import SkillList from "components/SkillSetup/SkillList/";
import HighlightsFormContainer from "../highlights/HighlightsFormContainer";
import CompanySetupContainer from "components/CompanySetup/";
import PersonSetup from "components/PersonSetup/";
import MakePopup from "components/hoc/MakePopup";

const CandidateExperienceCrudForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		dirtyMsg,
		changeFormFields
	} = useForm(props.job, {}, props.handleSave);
	const [currentJob, setCurrentJob] = useState(!formFields.endDate);
	const [oldEndDate, setOldEndDAte] = useState(formFields.endDate);
	const { job, showPerson, showCompany, showHighlights } = props;

	const CompanyPopup = MakePopup(
		CompanySetupContainer,
		{ left: "250px", top: "200px", width: "1000px" },
		true
	);

	const PersonPopup = MakePopup(
		PersonSetup,
		{ left: "250px", top: "200px", width: "1000px" },
		true
	);

	const jobForm = () => {
		return (
			<Form className="experience-form">
				<FontIcon onClick={() => alert("test")}>arrow_upward</FontIcon>
				<div className="tsd-form-row">
					<InpString
						id="titleDescription"
						name="jobTitle"
						label="Job Title *"
						value={formFields.jobTitle}
						autoFocus
						required
						disabled={showPerson || showCompany}
					/>
					<InpString
						id="company"
						name="company-name"
						label="Company *"
						value={formFields.company.name}
						onClick={props.handleCompanyClick}
						onFocus={props.handleCompanyClick}
						required
						disabled={showPerson}
					/>
				</div>
				{!showHighlights ? (
					<React.Fragment>
						<div className="tsd-form-row">
							<InpString
								id="contactperson"
								name="contactPerson-formattedName"
								label="Contact Person"
								value={formFields.contactPerson.formattedName}
								onClick={props.handlePersonClick}
								onFocus={props.handlePersonClick}
								disabled={showCompany}
							/>
							<InpPhone
								id="contactphone"
								name="contactPerson-workPhone"
								label="Contact Work Phone"
								value={formFields.contactPerson.workPhone}
								disabled
							/>
						</div>
						<div className="tsd-form-row">
							<InpDate
								id="startDate"
								name="startDate"
								label="Start Date"
								className="date-entry"
								value={formFields.startDate}
								required
								disabled={showPerson || showCompany}
							/>
							<Checkbox
								id="endDateCheck"
								name="endDate"
								label="Current Job"
								value="currentJob"
								style={{ paddingTop: "36px" }}
								checked={currentJob}
								onChange={(check, ev) => {
									if (!check) {
										formFields.endDate = oldEndDate;
										changeFormFields("endDate", oldEndDate);
									} else {
										formFields.endDate && setOldEndDAte(formFields.endDate);
										changeFormFields("endDate", null);
									}
									setCurrentJob(check);
								}}
							/>
							<InpDate
								id="endDate"
								name="endDate"
								className="date-entry"
								label="End Date"
								value={currentJob ? null : formFields.endDate}
								disabled={currentJob || showPerson || showCompany}
							/>
						</div>
						<div className="tsd-form-row">
							<InpRadio
								id="salary"
								name="salary"
								className="salary-radio"
								value={formFields.payType}
								label={"Salary / Hourly"}
								controls={[
									{
										label: "Salary",
										value: "Salary"
									},
									{
										label: "Hourly",
										value: "Hourly"
									}
								]}
								disabled={showPerson || showCompany}
							/>
							<InpTextAsNumber
								id="startPay"
								name="startPay"
								label="Starting Pay"
								value={formFields.startPay}
								disabled={showPerson || showCompany}
							/>
							<InpTextAsNumber
								id="endPay"
								name="endPay"
								label="Ending Pay"
								value={formFields.endPay}
								disabled={showPerson || showCompany}
							/>
						</div>
						<ExpansionList>
							<ExpansionPanel label="Job Related Skills" footer={null}>
								<div className="skill-edit-list">
									<SkillList
										skills={job.skills}
										editFlag={true}
										handleSkillsChange={props.handleSkillsChange}
										candId={props.candId}
									/>
								</div>
							</ExpansionPanel>
							<ExpansionPanel label="Job Highlights" footer={null}>
								<div className="experience-highlights">
									<HighlightsFormContainer
										highlights={formFields.highlights}
										handleHighlightChange={h => {
											changeFormFields("highlights", h);
										}}
										includeInSummary={true}
										candId={props.candId}
										disabled={showPerson || showCompany}
										tableHeight={250}
									/>
								</div>
							</ExpansionPanel>
						</ExpansionList>
					</React.Fragment>
				) : (
					<div className="experience-highlights">
						<HighlightsFormContainer
							highlights={formFields.highlights}
							handleHighlightChange={h => {
								changeFormFields("highlights", h);
							}}
							includeInSummary={true}
							candId={props.candId}
							disabled={showPerson || showCompany}
						/>
					</div>
				)}

				<div className="button-section">
					<BtnSubmit disabled={!formFields.company.id || !formFields.jobTitle}>
						Save &amp; Close
					</BtnSubmit>
					<BtnCancel onCancel={props.handleCancel} checkDirty />
					<Button type="button" btnType="info" onClick={props.toggleHighlights}>
						{showHighlights ? "Close " : "Open "} Job Highlights
					</Button>
				</div>
			</Form>
		);
	};

	return (
		<section className="candidate-job">
			{dirtyMsg}
			<input type="hidden" name="job-id" value={job.id} />
			{jobForm()}
			{showCompany && (
				<CompanyPopup
					company={job.company}
					handleCancel={props.handleCompanyCancel}
					handleSubmit={props.handleCompanySubmit}
				/>
			)}
			{showPerson && (
				<PersonPopup
					person={job.contactPerson}
					handleCancel={props.handlePersonCancel}
					handleSubmit={props.handlePersonSubmit}
				/>
			)}
		</section>
	);
};

export default CandidateExperienceCrudForm;
