import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { FormsProvider } from "./FormsContext";

//const objCopy = obj => JSON.parse(JSON.stringify(obj));

const clearFormfields = {
	name: "",
	objective: "",
	password1: "",
	password2: "",
	personal: {
		phone: "",
		age: "",
		email: "",
		weight: "",
		zipcode: ""
	},
	website: "",
	startDate: "",
	sendAlerts: false
};

const userInfoDefault = {
	name: "Fred Flintstone",
	objective: "A good job",
	password1: "abcdefghij",
	password2: "abcdefghij",
	personal: {
		phone: "615-222-8888",
		age: 33,
		email: "ronbout@abc.com",
		weight: 150,
		zipcode: "37211"
	},
	website: "",
	startDate: "2017-06-22",
	sendAlerts: true
};

const RegisterFormContainer = props => {
	const [userInfo, setUserInfo] = useState(userInfoDefault);

	const handleSubmit = formData => {
		console.log("form submitted: ", formData);
	};

	const handleInputChange = ev => {
		const target = ev.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		setUserInfo(prev => {
			return {
				...prev,
				[target.name]: value
			};
		});
	};

	/*
	const handleClear = () => {
		clearForm();
	};

	const clearForm = () => {
		setUserInfo({ ...clearFormfields });
	};
*/
	return (
		<FormsProvider>
			<RegisterForm
				clearFormFields={clearFormfields}
				handleInputChange={handleInputChange}
				userInfo={userInfo}
				handleSubmit={handleSubmit}
			/>
		</FormsProvider>
	);
};

export default RegisterFormContainer;
