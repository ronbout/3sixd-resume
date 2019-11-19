/* CompanySetupForm.js */
import React, { useState } from "react";
import { useForm } from "components/forms/useForm";
import CompanySearchContainer from "../search/CompanySearch";
import PersonSetup from "../PersonSetup/";
import MakePopup from "../hoc/MakePopup";
import Button from "styledComponents/Button";
import {
	InpString,
	InpEmail,
	InpUrl,
	InpPhone,
	InpZip,
	Form
} from "components/forms/formInputs";
import "./css/companySetup.css";

const PersonPopup = MakePopup(
	PersonSetup,
	{ left: "250px", top: "200px", width: "1000px" },
	true
);

const CompanySearchPopup = MakePopup(
	CompanySearchContainer,
	{
		right: "100px",
		top: "200px",
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

	const companyDetails = () => {
		return (
			<section>
				<input type="hidden" name="id" value={formFields.id} />
				<div className="tsd-form-row">
					<InpString
						id="company-name"
						name="name"
						label="Name *"
						value={formFields.name}
						autoFocus
						required
						disabled={props.showPerson}
					/>
					<InpString
						id="company-desc"
						name="description"
						label="Description"
						size={40}
						value={formFields.description}
						disabled={props.showPerson}
					/>
				</div>
				{/* Contact Row */}
				<div className="tsd-form-row">
					<InpPhone
						id="companyPhone"
						name="companyPhone"
						label="Primary Phone"
						value={formFields.companyPhone}
						disabled={props.showPerson}
					/>
					<InpString
						id="company-contactPerson"
						name="contactPerson"
						label="Primary Contact"
						value={formFields.contactPerson.formattedName}
						onChange={props.handleContactPersonChange}
						onClick={props.handlePersonClick}
					/>
				</div>
				{/* Email Row */}
				<div className="tsd-form-row">
					<InpEmail
						id="email"
						name="email"
						label="Company Email"
						value={formFields.email}
						disabled={props.showPerson}
					/>
					<InpUrl
						id="website"
						name="website"
						label="Website URL"
						type="url"
						value={formFields.website}
						disabled={props.showPerson}
					/>
				</div>
				{/* Address Row */}
				<div className="tsd-form-row">
					<InpString
						id="addressLine1"
						name="addressLine1"
						label="Street Address"
						value={formFields.addressLine1}
						disabled={props.showPerson}
					/>
					<InpString
						id="addressLine2"
						name="addressLine2"
						label="Apt/Suite #"
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
						value={formFields.municipality}
						disabled={props.showPerson}
					/>
					<InpString
						id="region"
						name="region"
						label="State"
						value={formFields.region}
						disabled={props.showPerson}
					/>
					<InpZip
						id="postalCode"
						name="postalCode"
						label="Zipcode"
						value={formFields.postalCode}
						disabled={props.showPerson}
					/>
					<InpString
						id="countryCode"
						name="countryCode"
						label="Country"
						value={formFields.countryCode}
						disabled={props.showPerson}
					/>
				</div>
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
