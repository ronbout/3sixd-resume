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
					label="Objective"
					rows={1}
					maxLength={499}
					name="objective"
					value={formFields.objective}
				/>
				<InpTextArea
					id="executiveSummary"
					label="Executive Summary"
					rows={2}
					maxLength={999}
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
