/* CandidateCertificationCrudForm.js */
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

const CandidateCertificationCrudForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		dirtyMsg,
		changeFormFields
	} = useForm(props.certification, {}, props.handleSave);
	const { certification } = props;

	const certificationForm = () => {
		return (
			<Form className="certification-form">
				<div className="tsd-form-row">
					<InpString
						id="certification-name"
						name="name"
						label="Certification Name *"
						value={formFields.name}
						autoFocus
						required
					/>
				</div>
				<div className="tsd-form-row">
					<InpString
						id="certification-description"
						name="description"
						label="Description"
						value={formFields.description}
					/>
				</div>
				<div className="tsd-form-row">
					<InpDate
						id="issueDate"
						name="issueDate"
						label="Issue Date"
						className="date-entry"
						value={formFields.issueDate}
					/>
				</div>

				<ExpansionList>
					<ExpansionPanel label="Related Skills" footer={null}>
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
					<BtnSubmit disabled={!formFields.name}>Save &amp; Close</BtnSubmit>
					<BtnCancel onCancel={props.handleCancel} checkDirty />
				</div>
			</Form>
		);
	};

	return (
		<section className="candidate-certification-detail">
			{dirtyMsg}
			<input type="hidden" name="certification-id" value={certification.id} />
			{certificationForm()}
		</section>
	);
};

export default CandidateCertificationCrudForm;
