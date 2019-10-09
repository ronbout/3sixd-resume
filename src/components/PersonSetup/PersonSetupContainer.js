import React, { Component } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import PersonSetupForm from "./PersonSetupForm";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";

const API_PERSON = "persons";

const clearFormFields = {
	id: "",
	title: "",
	formattedName: "",
	givenName: "",
	middleName: "",
	familyName: "",
	affix: "",
	email1: "",
	email2: "",
	primaryPhone: "",
	workPhone: "",
	mobilePhone: "",
	addressLine1: "",
	addressLine2: "",
	municipality: "",
	region: "",
	postalCode: "",
	countryCode: "",
	website: ""
};

class PersonSetupContainer extends Component {
	constructor(props) {
		super(props);
		let formFields = clearFormFields;
		if (props.person) {
			formFields = {
				...formFields,
				...props.person
			};
		}
		const buttons = props.buttons || {
			save: true,
			cancel: true,
			clear: true,
			search: true
		};
		this.state = {
			formFields,
			dispSearch: false,
			userMsg: "",
			buttons,
			apiBase: window.apiUrl
		};
		this.state.origForm = objCopy(formFields);
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (
			(this.props.person && !prevProps.person) ||
			(this.props.person &&
				prevProps.person &&
				this.props.person.id !== prevProps.person.id)
		) {
			this.setState({
				formFields: { ...this.props.person },
				origForm: { ...this.props.person }
			});
		}
	}

	handleSubmit = personInfo => {
		this.postPerson(personInfo);
	};

	postPerson = async personInfo => {
		let body = {
			...personInfo
		};
		// need to know if this is a new skill or update
		// (post vs put)
		const id = this.state.formFields.id;
		const httpMethod = id ? "PUT" : "POST";
		const endpoint = id ? `${API_PERSON}/${id}` : `${API_PERSON}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			this.setState({
				errMsg:
					result.errorCode === 45001
						? `Person ${this.state.formFields.formattedName} already exists.`
						: "An unknown error has occurred"
			});
		} else {
			// success.  let user know and clear out form
			/**
			 * need some kind of popup message that closes in time or click
			 *
			 */
			this.setState(
				{
					formFields: result,
					userMsg: `Personal Info has been ${
						httpMethod === "post" ? "created." : "updated."
					}`
				},
				() => {
					this.props.handleSubmit && this.props.handleSubmit(result);
				}
			);
		}
	};

	handleCancel = () => {
		// just go back with no update
		this.props.handleCancel && this.props.handleCancel();
	};

	// handleClear = () => {
	// 	console.log("handleClear");
	// 	// reset state
	// 	this.setState({
	// 		formFields: clearFormFields,
	// 		origForm: objCopy(clearFormFields)
	// 	});
	// };

	handleInputChange = event => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;

		this.setState({
			formFields: {
				...this.state.formFields,
				[target.name]: value
			}
		});
	};

	handleSearch = () => {
		this.setState({
			dispSearch: true
		});
	};

	handlePersonSelect = personInfo => {
		console.log("person info: ", personInfo);
		this.setState(
			{
				formFields: { ...personInfo }
			},
			() => this.handleClosePersonSearch()
		);
	};

	handleClosePersonSearch = () => {
		this.setState({
			dispSearch: false
		});
	};

	render() {
		return (
			<FormsProvider>
				<PersonSetupForm
					personInfo={this.state.formFields}
					clearFormFields={clearFormFields}
					heading={this.props.heading}
					dispSearch={this.state.dispSearch}
					handleInputChange={this.handleInputChange}
					handleSubmit={this.handleSubmit}
					handleCancel={this.handleCancel}
					handleSearch={this.handleSearch}
					handlePersonSelect={this.handlePersonSelect}
					handleClosePersonSearch={this.handleClosePersonSearch}
					buttons={this.state.buttons}
				/>
			</FormsProvider>
		);
	}
}

export default PersonSetupContainer;
