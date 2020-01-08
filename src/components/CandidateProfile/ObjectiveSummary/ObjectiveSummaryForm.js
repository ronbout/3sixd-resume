/* ObjectiveSummaryForm.js */
import React from "react";
import { InpTextArea, Form } from "components/forms/formInputs";
import { useForm } from "components/forms/useForm";
import { isEqual } from "lodash";

const ObjectiveSummaryForm = ({ formData, handleSubmit }) => {
	const { formFields, BtnSubmit, BtnCancel, dirtyMsg } = useForm(
		formData,
		{ jobTitle: "", objective: "", executiveSummary: "" },
		handleSubmit
	);

	// React.useEffect(() => {
	// 	console.log("OS Form rerender");
	// });
	return (
		<Form>
			{dirtyMsg}
			<div className="objective-form">
				<InpTextArea
					id="jobtitle"
					label="Job Title"
					rows={1}
					maxLength={30}
					name="jobTitle"
					value={formFields.jobTitle}
					reqWarn
				/>
				<InpTextArea
					id="objective"
					label="Objective"
					rows={1}
					maxLength={499}
					name="objective"
					value={formFields.objective}
					reqWarn
				/>
				<InpTextArea
					id="executiveSummary"
					label="Executive Summary"
					rows={1}
					maxLength={999}
					name="executiveSummary"
					value={formFields.executiveSummary}
					reqWarn
				/>
			</div>
			<div className="button-section">
				<BtnSubmit>Save</BtnSubmit>
				<BtnCancel checkDirty>Cancel</BtnCancel>
			</div>
		</Form>
	);
};

export default React.memo(ObjectiveSummaryForm, (prev, next) => {
	return isEqual(prev.formData, next.formData);
});
