import React from "react";
import { FormsProvider } from "components/forms/FormsContext";
import { Form } from "components/forms/formInputs";
import PersonSetupContainer from "components/PersonSetup/";

const PersonalInfoForm = props => {
	const handleFormSubmit = personInfo => {
		console.log("submit: ", personInfo);
		props.handleSubmit(personInfo);
	};

	return (
		<div className="personal-form-container">
			<FormsProvider>
				<Form className="personal-form">
					<PersonSetupContainer
						person={props.person}
						heading={false}
						handleSubmit={handleFormSubmit}
						buttons={{ save: true }}
					/>
				</Form>
			</FormsProvider>
		</div>
	);
};

export default PersonalInfoForm;
