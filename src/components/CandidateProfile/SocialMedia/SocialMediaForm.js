/* SocialMediaForm.js */
import React from "react";
import { InpString, Form } from "components/forms/formInputs";
import { useForm } from "components/forms/useForm";

const SocialMediaForm = ({ formData, handleSubmit }) => {
	const { formFields, BtnSubmit, BtnCancel, dirtyMsg } = useForm(
		formData,
		{ linkedIn: "", github: "" },
		handleSubmit
	);
	return (
		<Form>
			{dirtyMsg}
			<div className="social-form">
				<InpString
					id="linkedIn"
					name="linkedIn"
					label="LinkedIn"
					value={formFields.linkedIn}
					autoFocus
				/>
				<InpString
					id="github"
					name="github"
					label="Github"
					value={formFields.github}
				/>
			</div>
			<div className="button-section">
				<BtnSubmit>Save</BtnSubmit>
				<BtnCancel checkDirty>Cancel</BtnCancel>
			</div>
		</Form>
	);
};

export default SocialMediaForm;
