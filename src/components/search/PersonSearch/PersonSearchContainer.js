import React, { Component } from "react";

import PersonSearch from "./PersonSearch";

const API_SKILL_SEARCH = "persons/search";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class PersonSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        searchName: "",
        searchEmail: "",
        searchPhone: ""
      },
      results: [],
      personSelect: 0,
      loading: false,
      apiBase: window.apiUrl
    };
  }
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

  handleSearch = event => {
    event && event.preventDefault();
    this.setState({
      loading: true
    });
    let apiQuery = API_QUERY;
    // add the query parameters to apiQuery string
    if (this.state.formFields.searchName) {
      apiQuery += `&name=${this.state.formFields.searchName}`;
    }
    if (this.state.formFields.searchEmail) {
      apiQuery += `&email=${this.state.formFields.searchEmail}`;
    }
    if (this.state.formFields.searchPhone) {
      apiQuery += `&phone=${this.state.formFields.searchPhone}`;
    }
    const apiUrl = `${this.state.apiBase}${API_SKILL_SEARCH}${apiQuery}`;
    fetch(apiUrl)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // need to convert nulls to "" for react forms
          result &&
            result.forEach(obj => {
              Object.keys(obj).forEach(val => {
                obj[val] = obj[val] ? obj[val] : "";
              });
            });
          this.setState({
            results: result ? result : [],
            loading: false
          });
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      this.handleSearch();
    }
  };

  handlePersonClick = (ndx, event) => {
    this.setState({
      personSelect: ndx
    });
  };

  handleSelect = () => {
    console.log("handleSelect");
  };

  render() {
    return (
      <PersonSearch
        state={this.state}
        handleInputChange={this.handleInputChange}
        handleSearch={this.handleSearch}
        handlePersonClick={this.handlePersonClick}
        handleSelect={this.handleSelect}
        {...this.props}
      />
    );
  }
}

export default PersonSearchContainer;
