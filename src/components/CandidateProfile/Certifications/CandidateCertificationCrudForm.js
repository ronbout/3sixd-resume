/* CandidateEducationCrudForm.js */
import React, { useState } from "react";
import { useForm } from "components/forms/useForm";
import {
	InpString,
	InpDate,
	InpSelect,
	Form
} from "components/forms/formInputs";
import Checkbox from "styledComponents/Checkbox";
import {
	ExpansionList,
	ExpansionPanel
} from "styledComponents/ExpansionPanels";
import SkillList from "components/SkillSetup/SkillList";

const CandidateEducationCrudForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		dirtyMsg,
		changeFormFields
	} = useForm(props.education, {}, props.handleSave);
	const [currentEd, setCurrentEd] = useState(!formFields.endDate);
	const [oldEndDate, setOldEndDAte] = useState(formFields.endDate);
	const { education } = props;

	const degreeTypeOptions = [
		{ label: "Non Degree", value: "non-Degree" },
		{ label: "Bachelor's", value: "Bachelors" },
		{ label: "Master's", value: "Masters" },
		{ label: "Doctorate", value: "Doctorate" },
		{ label: "Diploma", value: "Diploma" }
	];

	const educationForm = () => {
		return (
			<Form className="education-form">
				<div className="tsd-form-row">
					<InpString
						id="schoolName"
						name="schoolName"
						label="School Name *"
						value={formFields.schoolName}
						autoFocus
						required
					/>
				</div>
				<div className="tsd-form-row">
					<InpString
						id="degreeName"
						name="degreeName"
						label="Degree Name *"
						placeholder="ex. Bachelor of Science"
						value={formFields.degreeName}
						required
					/>
					<InpSelect
						id="degreeType"
						name="degreeType"
						label="Degree Type *"
						menuItems={degreeTypeOptions}
						value={formFields.degreeType}
						style={{ width: "100%" }}
						required
					/>
				</div>
				{/* City / State / Zip */}
				<div className="tsd-form-row">
					<InpString
						id="schoolMunicipality"
						name="schoolMunicipality"
						label="City"
						value={formFields.schoolMunicipality}
					/>
					<InpString
						id="schoolRegion"
						name="schoolRegion"
						label="State"
						value={formFields.schoolRegion}
					/>
					<InpString
						id="schoolCountry"
						name="schoolCountry"
						label="Country"
						value={formFields.schoolCountry}
					/>
				</div>
				<div className="tsd-form-row">
					<InpDate
						id="startDate"
						name="startDate"
						label="Start Date"
						className="date-entry"
						value={formFields.startDate}
					/>
					<Checkbox
						id="endDateCheck"
						name="endDate"
						label="Currently Enrolled"
						value="currentEd"
						style={{ paddingTop: "36px" }}
						checked={currentEd}
						onChange={(check, ev) => {
							if (!check) {
								formFields.endDate = oldEndDate;
								changeFormFields("endDate", oldEndDate);
							} else {
								formFields.endDate && setOldEndDAte(formFields.endDate);
								changeFormFields("endDate", null);
							}
							setCurrentEd(check);
						}}
					/>
					<InpDate
						id="endDate"
						name="endDate"
						className="date-entry"
						label="End Date"
						value={currentEd ? null : formFields.endDate}
					/>
				</div>

				<div className="tsd-form-row" style={{ marginBottom: "18px" }}>
					<InpString
						id="degreeMajor"
						name="degreeMajor"
						label="Degree Major"
						placeholder="ex. Computer Science"
						value={formFields.degreeMajor}
					/>
					<InpString
						id="degreeMinor"
						name="degreeMinor"
						label="Degree Minor"
						placeholder="ex. Economics"
						value={formFields.degreeMinor}
					/>
				</div>

				<ExpansionList>
					<ExpansionPanel label="Education Based Skills" footer={null}>
						<div className="skill-edit-list">
							<SkillList
								skills={formFields.skills}
								editFlag={true}
								handleSkillsChange={s => {
									changeFormFields("skills", s);
								}}
								candId={props.candId}
							/>
						</div>
					</ExpansionPanel>
				</ExpansionList>

				<div className="button-section">
					<BtnSubmit
						disabled={!formFields.schoolName || !formFields.degreeName}
					>
						Save &amp; Close
					</BtnSubmit>
					<BtnCancel onCancel={props.handleCancel} checkDirty />
				</div>
			</Form>
		);
	};

	return (
		<section className="candidate-education-detail">
			{dirtyMsg}
			<input type="hidden" name="education-id" value={education.id} />
			{educationForm()}
		</section>
	);
};

export default CandidateEducationCrudForm;
