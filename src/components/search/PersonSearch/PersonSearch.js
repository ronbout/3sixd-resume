import React, { Component } from "react";

import "./css/personSearch.css";

const API_SKILL_SEARCH = "persons/search";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

class PersonSearch extends Component {
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
      <section className="person-search">
        <h2>Person Search</h2>
        <div className="person-search-form">
          <fieldset>
            <legend>Search Criteria</legend>
            {this.inputFields()}
          </fieldset>
          {this.resultListing()}
          {this.buttons()}
        </div>
      </section>
    );
  }

  inputFields = () => {
    return (
      <React.Fragment>
        <div className="form-group row">
          <div className="col-1" />
          <label className="col-2 col-form-label">Name: </label>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              name="searchName"
              placeholder="Enter Search Name"
              value={this.state.formFields.searchName}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-1" />
          <label className="col-2 col-form-label">Phone: </label>
          <div className="col-8">
            <input
              type="tel"
              className="form-control"
              name="searchPhone"
              placeholder="Enter Search Phone"
              value={this.state.formFields.searchPhone}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-1" />
          <label className="col-2 col-form-label">Email: </label>
          <div className="col-8">
            <input
              type="email"
              className="form-control"
              name="searchEmail"
              placeholder="Enter Search Email"
              value={this.state.formFields.searchEmail}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  resultListing = () => {
    return (
      <div className="div-select-container">
        {this.state.results.length && !this.state.loading ? (
          this.state.results.map((personInfo, ndx) => {
            return (
              <div
                className={
                  "div-select" +
                  (this.state.personSelect === ndx ? " selected" : "")
                }
                key={ndx}
                data-value={ndx}
                onClick={() => this.handlePersonClick(ndx)}
                onDoubleClick={this.handleSelect}
                title={
                  personInfo.email1 ? personInfo.email1 : "No email available "
                }
              >
                {personInfo.formattedName}
              </div>
            );
          })
        ) : this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  };

  buttons = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-info"
          onClick={this.handleSearch}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSelect}
        >
          Select
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={this.props.closeBtn}
        >
          Close
        </button>
      </div>
    );
  };
}

export default PersonSearch;
