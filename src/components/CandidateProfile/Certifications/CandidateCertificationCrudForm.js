/* CandidateCertificationCrudForm.js */
import React from "react";
import { useForm } from "components/forms/useForm";
import {
	InpString,
	InpDate,
	// InpSelect,
	Form
} from "components/forms/formInputs";
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
						maxLength={60}
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
						maxLength={240}
						value={formFields.description}
					/>
				</div>
				<div className="tsd-form-row">
					<InpDate
						id="issueDate"
						name="issueDate"
						label="Issue Date"
						className="date-entry"
						monthYearOnly
						value={formFields.issueDate}
					/>
				</div>
				<div className="tsd-form-row">
					<InpString
						id="certificate-img"
						name="certificateImage"
						label="Certification Image *"
						maxLength={80}
						value={formFields.certificateImage}
					/>
				</div>

				<ExpansionList>
					<ExpansionPanel
						label="Related Skills"
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
