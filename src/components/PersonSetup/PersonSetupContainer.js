import React, { Component } from "react";

import PersonSetupForm from "./PersonSetupForm";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";

const API_PERSON = "persons";

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
  mobilePhone: "",
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
    if (props.person) {
      formFields = {
        ...formFields,
        ...props.person
      };
    }
    const buttons = props.buttons || {
      save: true,
      cancel: true,
      clear: true,
      search: true
    };
    this.state = {
      formFields,
      dispSearch: false,
      userMsg: "",
      buttons,
      apiBase: window.apiUrl
    };
    this.state.origForm = objCopy(formFields);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      (this.props.person && !prevProps.person) ||
      (this.props.person &&
        prevProps.person &&
        this.props.person.id !== prevProps.person.id)
    ) {
      this.setState({
        formFields: { ...this.props.person },
        origForm: { ...this.props.person }
      });
    }
  }

  handleSubmit = () => {
    this.postPerson();
    // // submit to api and send info back to calling
    // let body = {
    //   ...this.state.formFields
    // };
    // // need to know if this is a new skill or update
    // // (post vs put)
    // const id = this.state.formFields.id;
    // const httpMethod = id ? "put" : "post";
    // const basicUrl =
    //   (id
    //     ? `${this.state.apiBase}${API_PERSON}/${id}`
    //     : `${this.state.apiBase}${API_PERSON}`) + API_QUERY;
    // let httpConfig = {
    //   method: httpMethod,
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    // fetch(basicUrl, httpConfig)
    //   .then(response => {
    //     response.json().then(result => {
    //       // figure out what to do here
    //       if (result.error) {
    //         this.setState({
    //           errMsg:
    //             result.errorCode === 45001
    //               ? `Person ${
    //                   this.state.formFields.formattedName
    //                 } already exists.`
    //               : "An unknown error has occurred"
    //         });
    //       } else {
    //         result = convertNullsToEmpty(result.data);
    //         // success.  let user know and clear out form
    //         /**
    //          * need some kind of popup message that closes in time or click
    //          *
    //          *
    //          *
    //          *
    //          *
    //          */
    //         this.setState(
    //           {
    //             formFields: result,
    //             userMsg: `Personal Info has been ${
    //               httpMethod === "post" ? "created." : "updated."
    //             }`
    //           },
    //           () => {
    //             this.props.handleSubmit && this.props.handleSubmit(result);
    //           }
    //         );
    //       }
    //     });
    //   })
    //   .catch(error => {
    //     console.log("Fetch error: ", error);
    //   });
  };

  postPerson = async () => {
    let body = {
      ...this.state.formFields
    };
    // need to know if this is a new skill or update
    // (post vs put)
    const id = this.state.formFields.id;
    const httpMethod = id ? "PUT" : "POST";
    const endpoint = id ? `${API_PERSON}/${id}` : `${API_PERSON}`;

    let result = await dataFetch(endpoint, "", httpMethod, body);
    if (result.error) {
      this.setState({
        errMsg:
          result.errorCode === 45001
            ? `Person ${this.state.formFields.formattedName} already exists.`
            : "An unknown error has occurred"
      });
    } else {
      // success.  let user know and clear out form
      /**
       * need some kind of popup message that closes in time or click
       *
       */
      this.setState(
        {
          formFields: result,
          userMsg: `Personal Info has been ${
            httpMethod === "post" ? "created." : "updated."
          }`
        },
        () => {
          this.props.handleSubmit && this.props.handleSubmit(result);
        }
      );
    }
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
    console.log("person info: ", personInfo);
    this.setState(
      {
        formFields: { ...personInfo }
      },
      () => this.handleClosePersonSearch()
    );
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
        buttons={this.state.buttons}
      />
    );
  }
}

export default PersonSetupContainer;
