import React, { Component } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import PersonSetupForm from "./PersonSetupForm";
import { objCopy } from "assets/js/library";
import dataFetch from "assets/js/dataFetch";
import { isEmptyObject } from "assets/js/library";
import Snackbar from "styledComponents/Snackbar";

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
			formFields: objCopy(formFields),
			dispSearch: false,
			buttons,
			toast: {}
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
		this.closeToast();
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
			const errMsg =
				result.errorCode === 45001
					? `Person ${personInfo.formattedName} already exists.`
					: "An unknown error has occurred";
			this.addToast(errMsg, "Close", false);
		} else {
			// success.  display toast to userMsg
			const userMsg = `Personal Info has been ${
				httpMethod === "post" ? "created." : "updated."
			}`;
			this.addToast(userMsg);
			this.setState(
				{
					formFields: result
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

	handleSearch = () => {
		this.setState({
			dispSearch: true
		});
	};

	handlePersonSelect = personInfo => {
		this.setState(
			{
				formFields: personInfo
			},
			() => this.handleClosePersonSearch()
		);
	};

	handleClosePersonSearch = () => {
		this.setState({
			dispSearch: false
		});
	};

	addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		this.setState({ toast });
	};

	closeToast = () => {
		this.setState({ toast: {} });
	};

	render() {
		return (
			<React.Fragment>
				{!this.props.popup ? (
					<h1 style={{ textAlign: "center", marginTop: "2rem" }}>
						Person Setup
					</h1>
				) : (
					""
				)}
				<FormsProvider>
					<PersonSetupForm
						personInfo={this.state.formFields}
						clearFormFields={clearFormFields}
						heading={this.props.heading}
						dispSearch={this.state.dispSearch}
						popup={!!this.props.popup}
						handleSubmit={this.handleSubmit}
						handleCancel={this.handleCancel}
						handleSearch={this.handleSearch}
						handlePersonSelect={this.handlePersonSelect}
						handleClosePersonSearch={this.handleClosePersonSearch}
						buttons={this.state.buttons}
					/>
				</FormsProvider>
				{isEmptyObject(this.state.toast) || (
					<Snackbar
						text={this.state.toast.text}
						action={this.state.toast.action}
						autohide={this.state.toast.autoHide}
						timeout={this.state.toast.timeout}
						closeCallBk={this.closeToast}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default PersonSetupContainer;
