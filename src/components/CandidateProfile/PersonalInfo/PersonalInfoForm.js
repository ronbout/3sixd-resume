import React from "react";
import PersonSetupContainer from "components/PersonSetup/";

const PersonalInfoForm = props => {
	const handleFormSubmit = personInfo => {
		props.handleSubmit(personInfo);
	};

	return (
		<div className="personal-form-container">
			<PersonSetupContainer
				person={props.person}
				heading={false}
				popup={false}
				buttons={{ save: true, cancel: true }}
				handleSubmit={handleFormSubmit}
			/>
		</div>
	);
};

export default PersonalInfoForm;
