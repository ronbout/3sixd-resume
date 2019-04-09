import React, { Component } from "react";

import PersonSetup from "../PersonSetup/";
import MakePopup from "../../hoc/MakePopup";

import "./css/companySetup.css";

import { objCopy } from "../../assets/js/library";

const clearFormFields = {
  id: "",
  name: "",
  description: "",
  companyPhone: "",
  contactPerson: {
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

const PersonPopup = MakePopup(
  PersonSetup,
  { left: "250px", top: "200px", width: "1000px" },
  true
);

class CompanySetup extends Component {
  constructor(props) {
    super(props);
    let formFields = clearFormFields;
    if (this.props.company) {
      formFields = {
        ...formFields,
        ...this.props.company
      };
    }
    this.state = {
      formFields,
      showPerson: false
    };
    this.state.origForm = objCopy(formFields);
  }

  handleSubmit = () => {
    // submit to api and send info back to calling
    console.log("submit the company info");
    this.props.handleSubmit && this.props.handleSubmit(this.state.formFields);
  };

  handleCancel = () => {
    // just go back with no update
    console.log("Cancel ");
    this.props.handleCancel && this.props.handleCancel();
  };

  handleClear = () => {
    // reset state
    this.setState({
      formFields: clearFormFields,
      origForm: objCopy(clearFormFields)
    });
  };

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
      formFields: {
        ...this.state.formFields,
        contactPerson: personInfo
      },
      showPerson: false
    });
  };

  handleContactPersonChange = event => {
    // don't do anything, must change Person
    // through popup, but need this method
    // to prevent complaining from React
    return;
    /*     const target = event.target;

    this.setState({
      formFields: {
        ...this.state.formFields,
        contactPerson: {
          ...this.state.contactPerson,
          formattedName: target.value
        }
      }
    }); */
  };

  render() {
    return (
      <main className="container-fluid company-main">
        <h1>Company Entry/Update</h1>
        <div className="company-setup">
          <div className="company-form">
            {this.companyDetails()}
            {this.buttonSection()}
          </div>

          {this.state.showPerson && (
            <PersonPopup
              person={this.state.formFields.contactPerson}
              handleCancel={this.handlePersonCancel}
              handleSubmit={this.handlePersonSubmit}
            />
          )}
        </div>
      </main>
    );
  }

  companyDetails() {
    return (
      <div>
        <input type="hidden" name="id" value={this.state.formFields.id} />
        <div className="form-group row">
          <label className="col-2 col-form-label">Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              size="20"
              name="name"
              placeholder="Company Name"
              value={this.state.formFields.name}
              onChange={this.handleInputChange}
              required
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
              value={this.state.formFields.description}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.companyPhone}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.contactPerson.formattedName}
              onChange={this.handleContactPersonChange}
              onClick={this.handlePersonClick}
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
              value={this.state.formFields.email}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.website}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.addressLine1}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.addressLine2}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.municipality}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="region"
              placeholder="State"
              value={this.state.formFields.region}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="postalCode"
              placeholder="Zip Code"
              value={this.state.formFields.postalCode}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="countryCode"
              placeholder="Country"
              value={this.state.formFields.countryCode}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }

  buttonSection() {
    return (
      <div className="button-section">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={this.handleClear}
        >
          Clear
        </button>
      </div>
    );
  }
}

export default CompanySetup;
