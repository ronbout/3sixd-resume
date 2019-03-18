import React from "react";

const CandidatePerson = props => {
  const objName = props.objName;
  return (
    <section className="candidate-person">
      {/* Name Row */}
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="givenName">
          Name: *
        </label>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="givenName"
            placeholder="First Name (required)"
            value={props.formFields[objName].givenName}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="familyName"
            placeholder="Last Name (required)"
            value={props.formFields[objName].familyName}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            name="middleName"
            placeholder="Middle"
            value={props.formFields[objName].middleName}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
        <div className="col-md-1">
          <input
            type="text"
            className="form-control"
            name="affix"
            placeholder="Affix"
            value={props.formFields[objName].affix}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
      </div>
      {/* Email Row */}
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="email1">
          Primary Email: *
        </label>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control"
            name="email1"
            placeholder="Primary Email (required)"
            value={props.formFields[objName].email1}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <label className="col-md-2 col-form-label label-right" htmlFor="email2">
          Alternate Email:
        </label>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control"
            name="email2"
            placeholder="Alternate Email"
            value={props.formFields[objName].email2}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
      </div>
      {/* Phone Row */}
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="primaryPhone">
          Primary/Work Phones: *
        </label>
        <div className="col-md-3">
          <input
            type="tel"
            className="form-control"
            name="primaryPhone"
            placeholder="Primary Phone (required)"
            value={props.formFields[objName].primaryPhone}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="tel"
            className="form-control"
            name="workPhone"
            placeholder="Work Phone"
            value={props.formFields[objName].workPhone}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
      </div>
      {/* Address Row */}
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="addressLine1">
          Address:
        </label>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="addressLine1"
            placeholder="Street Address"
            value={props.formFields[objName].addressLine1}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
        <label
          className="col-md-1 col-form-label label-right"
          htmlFor="addressLine2"
        >
          Apt #:
        </label>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            name="addressLine2"
            placeholder="Apt/Suite"
            value={props.formFields[objName].addressLine2}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
      </div>
      {/* City / State / Zip */}
      <div className="form-group row">
        <label className="col-md-2 col-form-label" htmlFor="municipality">
          City/State/Zip/Country:
        </label>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="municipality"
            placeholder="City (required)"
            value={props.formFields[objName].municipality}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            name="region"
            placeholder="State (required)"
            value={props.formFields[objName].region}
            onChange={event => props.handleInputChange(objName, event)}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            name="postalCode"
            placeholder="Zip Code"
            value={props.formFields[objName].postalCode}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            name="countryCode"
            placeholder="Country"
            value={props.formFields[objName].countryCode}
            onChange={event => props.handleInputChange(objName, event)}
          />
        </div>
      </div>
    </section>
  );
};

export default CandidatePerson;
