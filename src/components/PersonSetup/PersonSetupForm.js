/* PersonSetupForm.js */
import React, { useState } from "react";
import { useForm } from "components/forms/useForm";
import Button from "styledComponents/Button";
import PersonSearchContainer from "components/search/PersonSearch";
import PersonAuto from "./PersonAuto";
import MakePopup from "components/hoc/MakePopup";
import {
	InpString,
	InpEmail,
	InpUrl,
	InpPhone,
	InpZip,
	Form
} from "components/forms/formInputs";
import "./css/personSetup.css";

const PersonSearchPopup = MakePopup(
	PersonSearchContainer,
	{
		right: "100px",
		top: "200px",
		width: "344px"
	},
	true
);

const PersonSetupForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		BtnClear,
		dirtyMsg,
		changeFormFields
	} = useForm(props.personInfo, props.clearFormFields, props.handleSubmit);
	const [newPerson, setNewPerson] = useState(false);

	const personDetails = () => {
		return (
			<section className="candidate-person">
				<input type="hidden" name="id" value={formFields.id} />
				{/* Name Row */}
				<div className="tsd-form-row">
					{formFields.id ? (
						<React.Fragment>
							<InpString
								id="givenName"
								name="givenName"
								label="First Name *"
								value={formFields.givenName}
								autoFocus
								required
							/>
							<InpString
								id="familyName"
								name="familyName"
								label="Last Name *"
								value={formFields.familyName}
								required
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<PersonAuto
								id="autocomplete-firstname"
								label="First Name *"
								person={formFields.givenName}
								handleOnChange={val => changeFormFields("givenName", val)}
								handlePersonSelect={p => {
									setNewPerson(true);
									props.handlePersonSelect(p);
								}}
								autoFocus
								required
							/>
							<PersonAuto
								id="autocomplete-familyname"
								label="Last Name *"
								person={formFields.familyName}
								handleOnChange={val => changeFormFields("familyName", val)}
								handlePersonSelect={p => {
									setNewPerson(true);
									props.handlePersonSelect(p);
								}}
								required
							/>
						</React.Fragment>
					)}
					<InpEmail
						id="email"
						name="email1"
						label="Primary Email"
						value={formFields.email1}
					/>
				</div>
				{/* Phone Row */}
				<div className="tsd-form-row">
					<InpPhone
						id="mobilePhone"
						name="mobilePhone"
						label="Mobile Phone"
						value={formFields.mobilePhone}
					/>
					<InpPhone
						id="workPhone"
						name="workPhone"
						label="Work Phone"
						value={formFields.workPhone}
					/>
				</div>
				{/* Address Row */}
				<div className="tsd-form-row">
					<InpString
						id="addressLine1"
						name="addressLine1"
						label="Street Address"
						value={formFields.addressLine1}
					/>
					<InpString
						id="addressLine2"
						name="addressLine2"
						label="Apt/Suite #"
						value={formFields.addressLine2}
					/>
				</div>
				{/* City / State / Zip */}
				<div className="tsd-form-row">
					<InpString
						id="municipality"
						name="municipality"
						label="City"
						value={formFields.municipality}
						reqWarn
					/>
					<InpString
						id="region"
						name="region"
						label="State"
						value={formFields.region}
					/>
					<InpZip
						id="postalCode"
						name="postalCode"
						label="Zipcode"
						value={formFields.postalCode}
					/>
				</div>
				{/* Website Row */}
				<div className="tsd-form-row">
					<InpString
						id="countryCode"
						name="countryCode"
						label="Country"
						value={formFields.countryCode}
					/>
					<InpUrl
						id="website"
						name="website"
						label="Website URL"
						type="url"
						value={formFields.website}
					/>
				</div>
			</section>
		);
	};

	const buttonSection = () => {
		// cancelAction and saveEnable are explained in CompanySetupForm which
		// is also both a standalone and popup form
		const cancelAction = props.popup ? { onCancel: props.handleCancel } : {};
		const saveEnable = props.popup && newPerson;
		return (
			<div className="button-section">
				{props.buttons && props.buttons.save === true && (
					<BtnSubmit enabled={saveEnable}>
						{props.popup ? "Save & Close" : "Save"}
					</BtnSubmit>
				)}

				{props.buttons && props.buttons.cancel === true && (
					<BtnCancel {...cancelAction} checkDirty />
				)}

				{props.buttons && props.buttons.clear === true && (
					<BtnClear
						onClick={() => {
							setNewPerson(false);
						}}
						checkDirty
					/>
				)}

				{props.buttons && props.buttons.search === true && (
					<Button type="button" btnType="info" onClick={props.handleSearch}>
						Search
					</Button>
				)}
			</div>
		);
	};

	const dispPersonSearch = () => {
		return (
			<PersonSearchPopup
				handlePersonSelect={p => {
					setNewPerson(true);
					props.handlePersonSelect(p);
				}}
				closeBtn={props.handleClosePersonSearch}
			/>
		);
	};

	return (
		<div className="container-fluid person-main">
			{dirtyMsg}
			{props.heading && <h1>{props.heading}</h1>}
			<div className="person-setup">
				<div className="person-form">
					<Form className="personal-form">
						{personDetails()}
						{buttonSection()}
						{props.dispSearch && dispPersonSearch()}
					</Form>
				</div>
			</div>
		</div>
	);
};

export default PersonSetupForm;
