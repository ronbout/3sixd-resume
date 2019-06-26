import React, { Component } from "react";

import PersonSetupForm from "./PersonSetupForm";
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

class PersonSetupContainer extends Component {
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
      <PersonSetupForm
        state={this.state}
        heading={this.props.heading}
        dispSearch={this.props.dispSearch}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        handleCancel={this.handleCancel}
        handleClear={this.handleClear}
        handleSearch={this.handleSearch}
        handlePersonSelect={this.handlePersonSelect}
        handleClosePersonSearch={this.handleClosePersonSearch}
        hideButtons={this.props.hideButtons}
      />
    );
  }
}

export default PersonSetupContainer;
