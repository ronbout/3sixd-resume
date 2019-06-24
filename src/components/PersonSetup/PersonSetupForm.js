import React from "react";

import PersonSearchContainer from "../search/PersonSearch";
import MakePopup from "../hoc/MakePopup";
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
  const personDetails = () => {
    return (
      <section className="candidate-person">
        <input type="hidden" name="id" value={props.state.formFields.id} />
        {/* Name Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="givenName"
              placeholder="First Name (required)"
              value={props.state.formFields.givenName}
              onChange={props.handleInputChange}
              required
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="familyName"
              placeholder="Last Name (required)"
              value={props.state.formFields.familyName}
              onChange={props.handleInputChange}
              required
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="middleName"
              placeholder="Middle"
              value={props.state.formFields.middleName}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col-1">
            <input
              type="text"
              className="form-control"
              name="affix"
              placeholder="Affix"
              value={props.state.formFields.affix}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        {/* Email Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Primary Email:</label>
          <div className="col-3">
            <input
              type="email"
              className="form-control"
              name="email1"
              placeholder="Primary Email"
              value={props.state.formFields.email1}
              onChange={props.handleInputChange}
            />
          </div>
          <label className="col-2 col-form-label label-right">
            Alternate Email:
          </label>
          <div className="col-3">
            <input
              type="email"
              className="form-control"
              name="email2"
              placeholder="Alternate Email"
              value={props.state.formFields.email2}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        {/* Phone Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Primary/Work Phones:</label>
          <div className="col-3">
            <input
              type="tel"
              className="form-control"
              name="primaryPhone"
              placeholder="Primary Phone"
              value={props.state.formFields.primaryPhone}
              onChange={props.handleInputChange}
            />
          </div>
          <div className="col-3">
            <input
              type="tel"
              className="form-control"
              name="workPhone"
              placeholder="Work Phone"
              value={props.state.formFields.workPhone}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        {/* Address Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Address:</label>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="addressLine1"
              placeholder="Street Address"
              value={props.state.formFields.addressLine1}
              onChange={props.handleInputChange}
            />
          </div>
          <label className="col-1 col-form-label label-right">Apt #:</label>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="addressLine2"
              placeholder="Apt/Suite"
              value={props.state.formFields.addressLine2}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        {/* City / State / Zip */}
        <div className="form-group row">
          <label className="col-2 col-form-label">City/St/Zip/Country:</label>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              name="municipality"
              placeholder="City"
              value={props.state.formFields.municipality}
              onChange={props.handleInputChange}
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
            />
          </div>
        </div>
        {/* Website Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Website URL:</label>
          <div className="col-3">
            <input
              type="url"
              className="form-control"
              name="website"
              placeholder="Website URL"
              value={props.state.formFields.website}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
      </section>
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

  const dispPersonSearch = () => {
    return (
      <PersonSearchPopup
        handlePersonSelect={props.handlePersonSelect}
        closeBtn={props.handleClosePersonSearch}
      />
    );
  };

  return (
    <main className="container-fluid person-main">
      <h1>{props.heading}</h1>
      <div className="person-setup">
        <div className="person-form">
          {personDetails()}
          {buttonSection()}
          {props.state.dispSearch && dispPersonSearch()}
        </div>
      </div>
    </main>
  );
};

export default PersonSetupForm;
