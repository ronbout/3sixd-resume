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
		width: "402px"
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
				<section className="tsd-form-section">
					<h2>Name & Contact Info</h2>
					{/* Name Row */}
					{formFields.id ? (
						<React.Fragment>
							<div className="tsd-form-row">
								<InpString
									id="givenName"
									name="givenName"
									label="First Name *"
									maxLength={30}
									value={formFields.givenName}
									autoFocus
									required
								/>
							</div>
							<div className="tsd-form-row">
								<InpString
									id="familyName"
									name="familyName"
									label="Last Name *"
									maxLength={30}
									value={formFields.familyName}
									required
								/>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="tsd-form-row">
								<PersonAuto
									id="autocomplete-firstname"
									label="First Name *"
									person={formFields.givenName}
									maxLength={30}
									handleOnChange={val => changeFormFields("givenName", val)}
									handlePersonSelect={p => {
										setNewPerson(true);
										props.handlePersonSelect(p);
									}}
									autoFocus
									required
								/>
							</div>
							<div className="tsd-form-row">
								<PersonAuto
									id="autocomplete-familyname"
									label="Last Name *"
									person={formFields.familyName}
									maxLength={30}
									handleOnChange={val => changeFormFields("familyName", val)}
									handlePersonSelect={p => {
										setNewPerson(true);
										props.handlePersonSelect(p);
									}}
									required
								/>
							</div>
						</React.Fragment>
					)}
					<div className="tsd-form-row">
						<InpEmail
							id="email"
							name="email1"
							label="Primary Email"
							maxLength={50}
							value={formFields.email1}
						/>
					</div>
					{/* Phone Row */}
					<div className="tsd-form-row">
						<InpPhone
							id="mobilePhone"
							name="mobilePhone"
							label="Mobile Phone"
							maxLength={20}
							value={formFields.mobilePhone}
							reqWarn={!formFields.workPhone && props.profile}
						/>
						<InpPhone
							id="workPhone"
							name="workPhone"
							label="Work Phone"
							maxLength={20}
							value={formFields.workPhone}
							reqWarn={!formFields.mobilePhone && props.profile}
						/>
					</div>
					<div className="tsd-form-row">
						<InpUrl
							id="website"
							name="website"
							label="Website URL"
							type="url"
							maxLength={120}
							value={formFields.website}
							reqWarn={props.profile}
						/>
					</div>
				</section>
				<section className="tsd-form-section">
					<h2>Address</h2>
					{/* Address Row */}
					<div className="tsd-form-row addr-line">
						<InpString
							id="addressLine1"
							name="addressLine1"
							label="Street Address"
							maxLength={80}
							value={formFields.addressLine1}
						/>
						<InpString
							id="addressLine2"
							name="addressLine2"
							label="Apt/Suite #"
							maxLength={50}
							value={formFields.addressLine2}
						/>
					</div>
					{/* City / State / Zip */}
					<div className="tsd-form-row">
						<InpString
							id="municipality"
							name="municipality"
							label="City"
							maxLength={30}
							value={formFields.municipality}
							reqWarn={props.profile}
						/>
					</div>
					<div className="tsd-form-row">
						<InpString
							id="region"
							name="region"
							label="State"
							maxLength={30}
							value={formFields.region}
						/>
						<InpZip
							id="postalCode"
							name="postalCode"
							label="Zipcode"
							maxLength={15}
							value={formFields.postalCode}
						/>
					</div>
					<div className="tsd-form-row">
						<InpString
							id="countryCode"
							name="countryCode"
							label="Country"
							maxLength={30}
							value={formFields.countryCode}
						/>
					</div>
				</section>
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
					<BtnSubmit
						enabled={saveEnable}
						disabled={!formFields.givenName || !formFields.familyName}
					>
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

	const containerStyle = props.profile ? { marginTop: 0 } : {};

	return (
		<div style={{ ...containerStyle }} className="person-main">
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
