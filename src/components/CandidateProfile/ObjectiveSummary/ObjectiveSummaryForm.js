import React from "react";
import { InpTextArea, Form } from "components/forms/formInputs";
import { useForm } from "components/forms/useForm";

const ObjectiveSummaryForm = ({ formData, handleSubmit }) => {
	const { formFields, BtnSubmit, BtnCancel, dirtyMsg } = useForm(
		formData,
		{ objective: "", executiveSummary: "" },
		handleSubmit
	);
	return (
		<Form>
			{dirtyMsg}
			<div className="objective-form">
				<InpTextArea
					id="objective"
					label="Objectie"
					rows={4}
					maxLength={499}
					name="objective"
					value={formFields.objective}
				/>
				<InpTextArea
					id="executiveSummary"
					label="Executive Summary"
					rows={6}
					name="executiveSummary"
					value={formFields.executiveSummary}
				/>
			</div>
			<div className="button-section">
				<BtnSubmit>Save</BtnSubmit>
				<BtnCancel checkDirty>Cancel</BtnCancel>
			</div>
		</Form>
	);
};

export default ObjectiveSummaryForm;
