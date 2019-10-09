import React from "react";
import PersonSetupContainer from "components/PersonSetup/";

const PersonalInfoForm = props => {
	const handleFormSubmit = personInfo => {
		console.log("submit: ", personInfo);
		props.handleSubmit(personInfo);
	};

	return (
		<div className="personal-form-container">
			<PersonSetupContainer
				person={props.person}
				heading={false}
				handleSubmit={handleFormSubmit}
				buttons={{ save: true }}
			/>
		</div>
	);
};

export default PersonalInfoForm;
