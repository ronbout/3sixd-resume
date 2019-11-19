import React, { Component } from "react";
import { FormsProvider } from "components/forms/FormsContext";
import CompanySetupForm from "./CompanySetupForm";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";
import { isEmptyObject } from "assets/js/library";
import Snackbar from "styledComponents/Snackbar";

const API_COMPANY = "companies";

const clearFormFields = {
	id: "",
	name: "",
	description: "",
	companyPhone: "",
	contactPerson: {
		id: "",
		formattedName: "",
		givenName: "",
		middleName: "",
		familyName: "",
		affix: "",
		email1: "",
		email2: "",
		primaryPhone: "",
		workPhone: "",
		addressLine1: "",
		addressLine2: "",
		municipality: "",
		region: "",
		postalCode: "",
		countryCode: "",
		website: ""
	},
	addressLine1: "",
	addressLine2: "",
	municipality: "",
	region: "",
	postalCode: "",
	countryCode: "",
	email: "",
	website: ""
};

class CompanySetupContainer extends Component {
	constructor(props) {
		super(props);
		let formFields = clearFormFields;
		if (props.company) {
			formFields = {
				...formFields,
				...props.company
			};
		}
		this.state = {
			formFields: objCopy(formFields),
			showPerson: false,
			dispSearch: false,
			toast: {}
		};
		this.state.origForm = objCopy(formFields);
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (
			(this.props.company && !prevProps.company) ||
			(this.props.company &&
				prevProps.company &&
				this.props.company.id !== prevProps.company.id)
		) {
			this.setState({
				formFields: { ...this.props.company },
				origForm: { ...this.props.company }
			});
		}
	}

	handleSubmit = companyInfo => {
		// submit to api and send info back to calling
		this.postCompany(companyInfo);
	};

	postCompany = async companyInfo => {
		this.closeToast();
		const contactPersonId = companyInfo.contactPerson
			? companyInfo.contactPerson.id
			: "";
		let body = {
			...companyInfo,
			contactPersonId
		};
		delete body.contactPerson;
		// need to know if this is a new skill or update
		// (post vs put)
		const id = this.state.formFields.id;
		const httpMethod = id ? "PUT" : "POST";
		const endpoint = id ? `${API_COMPANY}/${id}` : `${API_COMPANY}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			const errMsg =
				result.errorCode === 45001
					? `Company ${companyInfo.name} already exists.`
					: "An unknown error has occurred";
			this.addToast(errMsg, "Close", false);
		} else {
			// success.  display toast to userMsg
			const userMsg = `Company Info has been ${
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

	handleCompanySelect = companyInfo => {
		this.setState(
			{
				formFields: { ...companyInfo }
			},
			() => this.handleCloseCompanySearch()
		);
	};

	handleCloseCompanySearch = () => {
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

	handlePersonClick = event => {
		const showPerson = !this.state.showPerson;
		this.setState({
			showPerson
		});
	};

	handlePersonCancel = () => {
		this.setState({
			showPerson: false
		});
	};

	handlePersonSubmit = personInfo => {
		this.setState({
			showPerson: false
		});
	};

	handleContactPersonChange = event => {
		// don't do anything, must change Person
		// through popup, but need this method
		// to prevent complaining from React
		return;
	};

	render() {
		return (
			<React.Fragment>
				<FormsProvider>
					<CompanySetupForm
						companyInfo={this.state.formFields}
						clearFormFields={clearFormFields}
						showPerson={this.state.showPerson}
						dispSearch={this.state.dispSearch}
						popup={!!this.props.popup}
						handleContactPersonChange={this.handleContactPersonChange}
						handlePersonClick={this.handlePersonClick}
						handleSubmit={this.handleSubmit}
						handleCancel={this.handleCancel}
						handleSearch={this.handleSearch}
						handleCloseCompanySearch={this.handleCloseCompanySearch}
						handleCompanySelect={this.handleCompanySelect}
						handlePersonCancel={this.handlePersonCancel}
						handlePersonSubmit={this.handlePersonSubmit}
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

export default CompanySetupContainer;
