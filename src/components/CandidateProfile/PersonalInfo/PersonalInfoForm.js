import React from "react";
import PersonSetupContainer from "components/PersonSetup/";

const PersonalInfoForm = props => {
	// const handleFormSubmit = personInfo => {
	// 	props.handleSubmit(personInfo);
	// };

	return (
		<div className="personal-form-container">
			<PersonSetupContainer
				person={props.person}
				heading={false}
				popup={true}
				buttons={{ save: true, cancel: true }}
			/>
		</div>
	);
};

export default PersonalInfoForm;
