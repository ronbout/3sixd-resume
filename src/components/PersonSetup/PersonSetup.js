import React, { Component } from "react";

import PersonSearch from "../search/PersonSearch";
import MakePopup from "../hoc/MakePopup";
import "./css/personSetup.css";
import { objCopy } from "../../assets/js/library";

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
  addressLine1: "",
  addressLine2: "",
  municipality: "",
  region: "",
  postalCode: "",
  countryCode: "",
  website: ""
};

const PersonSearchPopup = MakePopup(
  PersonSearch,
  {
    right: "100px",
    top: "200px",
    width: "344px"
  },
  true
);

class PersonSetup extends Component {
  constructor(props) {
    super(props);
    let formFields = clearFormFields;
    if (this.props.person) {
      formFields = {
        ...formFields,
        ...this.props.person
      };
    }
    this.state = {
      formFields,
      dispSearch: false
    };
    this.state.origForm = objCopy(formFields);
  }

  handleSubmit = () => {
    // submit to api and send info back to calling
    console.log("post the person info to the api");

    // formattedName is a calc'd field that is displayed on other components,
    // so need to calc upon save
    const { givenName, middleName, familyName } = this.state.formFields;
    const formattedName = `${givenName} ${middleName} ${familyName}`;
    this.setState(
      {
        formFields: {
          ...this.state.formFields,
          formattedName
        }
      },
      () => {
        this.props.handleSubmit &&
          this.props.handleSubmit(this.state.formFields);
      }
    );
  };

  handleCancel = () => {
    // just go back with no update
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

  handleSearch = () => {
    this.setState({
      dispSearch: true
    });
  };

  handlePersonSelect = personInfo => {
    console.log(personInfo);
  };

  handleClosePersonSearch = () => {
    this.setState({
      dispSearch: false
    });
  };

  render() {
    return (
      <main className="container-fluid person-main">
        <h1>{this.props.heading || "Person Entry/Update"}</h1>
        <div className="person-setup">
          <div className="person-form">
            {this.personDetails()}
            {this.buttonSection()}
            {this.state.dispSearch && this.dispPersonSearch()}
          </div>
        </div>
      </main>
    );
  }

  personDetails() {
    return (
      <section className="candidate-person">
        <input type="hidden" name="id" value={this.state.formFields.id} />
        {/* Name Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Name: *</label>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="givenName"
              placeholder="First Name (required)"
              value={this.state.formFields.givenName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              name="familyName"
              placeholder="Last Name (required)"
              value={this.state.formFields.familyName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              name="middleName"
              placeholder="Middle"
              value={this.state.formFields.middleName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-1">
            <input
              type="text"
              className="form-control"
              name="affix"
              placeholder="Affix"
              value={this.state.formFields.affix}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.email1}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.email2}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.primaryPhone}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-3">
            <input
              type="tel"
              className="form-control"
              name="workPhone"
              placeholder="Work Phone"
              value={this.state.formFields.workPhone}
              onChange={this.handleInputChange}
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
              value={this.state.formFields.addressLine1}
              onChange={this.handleInputChange}
            />
          </div>
          <label className="col-1 col-form-label label-right">Apt #:</label>
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
          <label className="col-2 col-form-label">City/St/Zip/Country:</label>
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
        {/* Website Row */}
        <div className="form-group row">
          <label className="col-2 col-form-label">Website URL:</label>
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
      </section>
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
        <button
          type="button"
          className="btn btn-info"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }

  dispPersonSearch() {
    return (
      <PersonSearchPopup
        handlePersonSelect={this.handlePersonSelect}
        closeBtn={this.handleClosePersonSearch}
      />
    );
  }
}

export default PersonSetup;
