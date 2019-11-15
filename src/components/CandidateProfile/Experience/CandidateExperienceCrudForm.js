import React from "react";
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
import SkillList from "components/SkillSetup/SkillList/";
import HighlightsFormContainer from "../highlights/HighlightsFormContainer";
import CompanySetupContainer from "components/CompanySetup/";
import PersonSetup from "components/PersonSetup/";
import MakePopup from "components/hoc/MakePopup";

const CandidateExperienceCrudForm = props => {
	const { formFields, BtnSubmit, BtnCancel, dirtyMsg } = useForm(
		props.job,
		{},
		props.handleSave
	);
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
			<Form>
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
								value={formFields.startDate}
								required
								disabled={showPerson || showCompany}
							/>
							<InpDate
								id="endDate"
								name="endDate"
								label="End Date"
								value={formFields.endDate}
								disabled={showPerson || showCompany}
							/>
						</div>
						<div className="tsd-form-row">
							<InpRadio
								id="salary"
								name="salary"
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
						<div className="skill-edit-list">
							<SkillList
								skills={job.skills}
								editFlag={true}
								handleSkillsChange={props.handleSkillsChange}
								candId={props.candId}
							/>
						</div>
					</React.Fragment>
				) : (
					<div className="experience-highlights">
						<HighlightsFormContainer
							highlights={job.highlights}
							handleHighlightChange={props.handleHighlightChange}
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
