/* CompanySetupForm.js */
import React, { useState } from "react";
import { useForm } from "components/forms/useForm";
import CompanySearchContainer from "components/search/CompanySearch";
import PersonSetup from "components/PersonSetup/";
import MakePopup from "components/hoc/MakePopup";
import CompanyAuto from "./CompanyAuto";
import Button from "styledComponents/Button";
import { FontIcon } from "styledComponents/FontIcon";
import {
	InpString,
	InpEmail,
	InpUrl,
	InpPhone,
	InpZip,
	Form
} from "components/forms/formInputs";
import "./css/companySetup.css";

const emptyContactPerson = {
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
};

const PersonPopup = MakePopup(
	PersonSetup,
	{ left: "250px", top: "200px", width: "1000px" },
	true
);

const CompanySearchPopup = MakePopup(
	CompanySearchContainer,
	{
		right: "100px",
		top: "100px",
		width: "344px"
	},
	true
);

const CompanySetupForm = props => {
	const {
		formFields,
		BtnSubmit,
		BtnCancel,
		BtnClear,
		dirtyMsg,
		changeFormFields
	} = useForm(props.companyInfo, props.clearFormFields, props.handleSubmit);
	const [newCompany, setNewCompany] = useState(false);

	const removeContactPerson = () => {
		changeFormFields("contactPerson", emptyContactPerson);
	};

	const companyDetails = () => {
		return (
			<section>
				<input type="hidden" name="id" value={formFields.id} />
				<section className="tsd-form-section">
					<h2>Company Info</h2>
					<div className="tsd-form-row">
						{formFields.id ? (
							<InpString
								id="company-name"
								name="name"
								label="Name *"
								value={formFields.name}
								maxLength={80}
								autoFocus
								required
								disabled={props.showPerson}
							/>
						) : (
							<CompanyAuto
								company={formFields.name}
								handleOnChange={val => changeFormFields("name", val)}
								handleCompanySelect={c => {
									setNewCompany(true);
									props.handleCompanySelect(c);
								}}
								autoFocus
								maxLength={80}
								required
								disabled={props.showPerson}
							/>
						)}
					</div>
					<div className="tsd-form-row">
						<InpString
							id="company-desc"
							name="description"
							label="Description"
							size={40}
							maxLength={300}
							value={formFields.description}
							disabled={props.showPerson}
						/>
					</div>
				</section>
				<section className="tsd-form-section">
					<h2>Contact Info</h2>
					{/* Contact Row */}
					<div className="tsd-form-row">
						<InpPhone
							id="companyPhone"
							name="companyPhone"
							label="Primary Phone"
							maxLength={20}
							value={formFields.companyPhone}
							disabled={props.showPerson}
						/>
					</div>
					<div className="tsd-form-row">
						<InpString
							id="company-contactPerson"
							name="contactPerson"
							label="Primary Contact"
							value={formFields.contactPerson.formattedName}
							onChange={props.handleContactPersonChange}
							onClick={props.handlePersonClick}
							onFocus={props.handlePersonClick}
						/>
						{formFields.contactPerson.id && (
							<span
								onClick={removeContactPerson}
								style={{
									cursor: "pointer",
									padding: "0 20px 0 0",
									alignSelf: "flex-end"
								}}
								title="Remove Contact Person"
							>
								(<FontIcon style={{ verticalAlign: "top" }}>remove</FontIcon>)
							</span>
						)}
					</div>
					{/* Email Row */}
					<div className="tsd-form-row">
						<InpEmail
							id="email"
							name="email"
							label="Company Email"
							maxLength={50}
							value={formFields.email}
							disabled={props.showPerson}
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
							disabled={props.showPerson}
						/>
					</div>
				</section>
				<section className="tsd-form-section">
					<h2>Location</h2>
					{/* Address Row */}
					<div className="tsd-form-row addr-line">
						<InpString
							id="addressLine1"
							name="addressLine1"
							label="Street Address"
							maxLength={80}
							value={formFields.addressLine1}
							disabled={props.showPerson}
						/>
						<InpString
							id="addressLine2"
							name="addressLine2"
							label="Apt/Suite #"
							maxLength={50}
							value={formFields.addressLine2}
							disabled={props.showPerson}
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
							disabled={props.showPerson}
						/>
					</div>
					<div className="tsd-form-row">
						<InpString
							id="region"
							name="region"
							label="State"
							maxLength={30}
							value={formFields.region}
							disabled={props.showPerson}
						/>
						<InpZip
							id="postalCode"
							name="postalCode"
							label="Zipcode"
							maxLength={15}
							value={formFields.postalCode}
							disabled={props.showPerson}
						/>
					</div>
					<div className="tsd-form-row">
						<InpString
							id="countryCode"
							name="countryCode"
							label="Country"
							maxLength={30}
							value={formFields.countryCode}
							disabled={props.showPerson}
						/>
					</div>
				</section>
			</section>
		);
	};

	const buttonSection = () => {
		// if it is a popup, the cancel needs to call props.handleCancel
		// so that the popup will close.  Otherwise, cancel just resets
		// the form to origValues
		const cancelAction = props.popup ? { onCancel: props.handleCancel } : {};
		// if it is a popup, it is attached to an experience and changing the company
		// will require the ability to save so that the experience gets updated
		// as a result the Save btn must be enabled if a new company is loaded & popup
		const saveEnable = props.popup && newCompany;
		return (
			<div className="button-section">
				<BtnSubmit enabled={saveEnable}>
					{props.popup ? "Save & Close" : "Save"}
				</BtnSubmit>
				<BtnCancel {...cancelAction} checkDirty />
				<BtnClear
					onClick={() => {
						setNewCompany(false);
					}}
					checkDirty
				/>
				<Button type="button" btnType="info" onClick={props.handleSearch}>
					Search
				</Button>
			</div>
		);
	};

	const dispCompanySearch = () => {
		return (
			<CompanySearchPopup
				handleCompanySelect={c => {
					setNewCompany(true);
					props.handleCompanySelect(c);
				}}
				closeBtn={props.handleCloseCompanySearch}
			/>
		);
	};

	return (
		<main className="container-fluid company-main">
			{dirtyMsg}
			<h1>Company Entry/Update</h1>
			<div className="company-setup">
				<div className="company-form">
					<Form>
						{companyDetails()}
						{buttonSection()}
						{props.dispSearch && dispCompanySearch()}
					</Form>
				</div>

				{props.showPerson && (
					<PersonPopup
						person={formFields.contactPerson}
						popup={true}
						heading="Primary Contact Entry"
						handleCancel={props.handlePersonCancel}
						handleSubmit={p => {
							console.log("handleSubmit person: ", p);
							changeFormFields("contactPerson", p);
							props.handlePersonSubmit();
						}}
					/>
				)}
			</div>
		</main>
	);
};

export default CompanySetupForm;
