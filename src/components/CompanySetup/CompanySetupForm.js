import React from "react";

import CompanySearchContainer from "../search/CompanySearch";
import PersonSetup from "../PersonSetup/";
import MakePopup from "../hoc/MakePopup";
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
  const companyDetails = () => {
    return (
      <div>
        <input type="hidden" name="id" value={props.state.formFields.id} />
        <div className="form-group row">
          <label className="col-2 col-form-label">Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              size="20"
              name="name"
              placeholder="Company Name"
              value={props.state.formFields.name}
              onChange={props.handleInputChange}
              required
              disabled={props.state.showPerson}
            />
          </div>
          <label className="col-2 col-form-label label-right">
            Description:
          </label>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              size="40"
              name="description"
              placeholder="Description"
              value={props.state.formFields.description}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
        </div>
        {/* Contact Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Primary Phone:</label>
          <div className="col-3">
            <input
              type="tel"
              className="form-control"
              name="companyPhone"
              placeholder="Primary Phone"
              value={props.state.formFields.companyPhone}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <label className="col-2 col-form-label label-right">
            Primary Contact:
          </label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="contactPerson"
              placeholder="Primary Contact"
              value={props.state.formFields.contactPerson.formattedName}
              onChange={props.handleContactPersonChange}
              onClick={props.handlePersonClick}
            />
          </div>
        </div>
        {/* Email Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Company Email:</label>
          <div className="col-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Company Email"
              value={props.state.formFields.email}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <label className="col-2 col-form-label label-right">
            Website URL:
          </label>
          <div className="col-3">
            <input
              type="url"
              className="form-control"
              name="website"
              placeholder="Website URL"
              value={props.state.formFields.website}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
        </div>
        {/* Address Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="addressLine1">
            Address:
          </label>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="addressLine1"
              placeholder="Street Address"
              value={props.state.formFields.addressLine1}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <label
            className="col-1 col-form-label label-right"
            htmlFor="addressLine2"
          >
            Apt #:
          </label>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="addressLine2"
              placeholder="Apt/Suite"
              value={props.state.formFields.addressLine2}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
        </div>
        {/* City / State / Zip */}
        <div className="form-group row">
          <label className="col-2 col-form-label" htmlFor="municipality">
            City/State/Zip:
          </label>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="municipality"
              placeholder="City"
              value={props.state.formFields.municipality}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="region"
              placeholder="State"
              value={props.state.formFields.region}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="postalCode"
              placeholder="Zip Code"
              value={props.state.formFields.postalCode}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="countryCode"
              placeholder="Country"
              value={props.state.formFields.countryCode}
              onChange={props.handleInputChange}
              disabled={props.state.showPerson}
            />
          </div>
        </div>
      </div>
    );
  };

  const buttonSection = () => {
    return (
      <div className="button-section">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.handleSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={props.handleClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={props.handleSearch}
        >
          Search
        </button>
      </div>
    );
  };

  const dispCompanySearch = () => {
    return (
      <CompanySearchPopup
        handleCompanySelect={props.handleCompanySelect}
        closeBtn={props.handleCloseCompanySearch}
      />
    );
  };

  return (
    <main className="container-fluid company-main">
      <h1>Company Entry/Update</h1>
      <div className="company-setup">
        <div className="company-form">
          {companyDetails()}
          {buttonSection()}
          {props.state.dispSearch && dispCompanySearch()}
        </div>

        {props.state.showPerson && (
          <PersonPopup
            person={props.state.formFields.contactPerson}
            heading="Primary Contact Entry"
            handleCancel={props.handlePersonCancel}
            handleSubmit={props.handlePersonSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default CompanySetupForm;
