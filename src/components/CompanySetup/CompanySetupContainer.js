import React, { Component } from "react";

import CompanySetupForm from "./CompanySetupForm";
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

class CompanySetupContainer extends Component {
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
  };

  render() {
    return (
      <CompanySetupForm
        state={this.state}
        handleInputChange={this.handleInputChange}
        handleContactPersonChange={this.handleContactPersonChange}
        handlePersonClick={this.handlePersonClick}
        handleSubmit={this.handleSubmit}
        handleCancel={this.handleCancel}
        handleClear={this.handleClear}
        handlePersonCancel={this.handlePersonCancel}
        handlePersonSubmit={this.handlePersonSubmit}
      />
    );
  }
}

export default CompanySetupContainer;
