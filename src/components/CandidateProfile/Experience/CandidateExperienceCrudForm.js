/* CandidateExperienceCrudForm.js */
import React from "react";
import { useForm } from "components/forms/useForm";
import {
	InpString,
	InpTextArea,
	InpDate,
	InpTextAsNumber,
	InpPhone,
	InpRadio,
	Form
} from "components/forms/formInputs";
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

const emptyContactPerson = {
	id: "",
	formattedName: "",
	givenName: "",
	familyName: "",
	mobilePhone: "",
	workPhone: "",
	addressLine1: "",
	addressLine2: "",
	municipality: "",
	region: "",
	postalCode: "",
	countryCode: "",
	email1: "",
	website: ""
};

const CandidateExperienceCrudForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		dirtyMsg,
		changeFormFields
	} = useForm(props.job, {}, props.handleSave);
	// const [currentJob, setCurrentJob] = useState(!formFields.endDate);
	// const [oldEndDate, setOldEndDate] = useState(formFields.endDate);
	const { showPerson, showCompany } = props;

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

	const removeContactPerson = () => {
		changeFormFields("contactPerson", emptyContactPerson);
	};

	const jobForm = () => {
		return (
			<Form className="experience-form">
				<div className="tsd-form-row">
					<InpString
						id="titleDescription"
						name="jobTitle"
						label="Job Title *"
						value={formFields.jobTitle}
						maxLength={60}
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
						disabled={showPerson || showCompany}
					/>
				</div>
				<div className="tsd-form-row">
					<InpTextArea
						id="exp-summary"
						label="Summary"
						rows={2}
						maxLength={499}
						name="summary"
						value={formFields.summary}
					/>
				</div>
				<div className="tsd-form-row">
					<InpString
						id="contactperson"
						name="contactPerson-formattedName"
						label="Contact Person"
						value={formFields.contactPerson.formattedName}
						onClick={props.handlePersonClick}
						onFocus={props.handlePersonClick}
						disabled={showPerson || showCompany}
					/>
					{formFields.contactPerson.id &&
						formFields.contactPerson.id !==
							formFields.company.contactPersonId && (
							<span
								onClick={removeContactPerson}
								style={{
									cursor: "pointer",
									padding: "0 20px 0 0",
									alignSelf: "flex-end"
								}}
								title="Remove Contact Person"
							>
								(<FontIcon style={{ verticalAlign: "top" }}>remove</FontIcon>)
							</span>
						)}
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
						monthYearOnly
						required
						disabled={showPerson || showCompany}
					/>
					{/*}
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
								formFields.endDate && setOldEndDate(formFields.endDate);
								changeFormFields("endDate", null);
							}
							setCurrentJob(check);
						}}
					/>
					*/}
					<InpDate
						id="endDate"
						name="endDate"
						className="date-entry"
						label="End Date"
						isClearable
						value={formFields.endDate}
						monthYearOnly
						disabled={showPerson || showCompany}
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
					<ExpansionPanel
						label="Job Related Skills"
						footer={null}
						defaultExpanded={true}
					>
						<div className="skill-edit-list">
							<SkillList
								skills={formFields.skills}
								editFlag={true}
								handleSkillsChange={s => {
									changeFormFields("skills", s);
								}}
								candId={props.candId}
								dispSearch={false}
							/>
						</div>
					</ExpansionPanel>
					<ExpansionPanel
						label="Job Highlights"
						footer={null}
						defaultExpanded={true}
					>
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
								setAutoFocus={false}
							/>
						</div>
					</ExpansionPanel>
				</ExpansionList>

				<div className="button-section">
					<BtnSubmit disabled={!formFields.company.id || !formFields.jobTitle}>
						Save &amp; Close
					</BtnSubmit>
					<BtnCancel onCancel={props.handleCancel} checkDirty />
				</div>
			</Form>
		);
	};

	return (
		<section className="candidate-job">
			{dirtyMsg}
			<input type="hidden" name="job-id" value={formFields.id} />
			{jobForm()}
			{showCompany && (
				<CompanyPopup
					company={formFields.company}
					handleCancel={props.handleCompanyCancel}
					handleSubmit={c => {
						changeFormFields("company", c);
						props.handleCompanySubmit();
					}}
					popup={true}
				/>
			)}
			{showPerson && (
				<PersonPopup
					person={formFields.contactPerson}
					handleCancel={props.handlePersonCancel}
					heading="Contact Person Entry"
					handleSubmit={p => {
						console.log("handleSubmit person: ", p);
						changeFormFields("contactPerson", p);
						props.handlePersonSubmit();
					}}
					popup={true}
				/>
			)}
		</section>
	);
};

export default CandidateExperienceCrudForm;
