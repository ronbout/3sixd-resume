import React from "react";

import "./css/personSearch.css";

const PersonSearch = props => {
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      props.handleSearch();
    }
  };

  const inputFields = () => {
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
              value={props.state.formFields.searchName}
              onChange={props.handleInputChange}
              onKeyPress={handleKeyPress}
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
              value={props.state.formFields.searchPhone}
              onChange={props.handleInputChange}
              onKeyPress={handleKeyPress}
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
              value={props.state.formFields.searchEmail}
              onChange={props.handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  const resultListing = () => {
    return (
      <div className="div-select-container">
        {props.state.results.length && !props.state.loading ? (
          props.state.results.map((personInfo, ndx) => {
            return (
              <div
                className={
                  "div-select" +
                  (props.state.personSelect === ndx ? " selected" : "")
                }
                key={ndx}
                data-value={ndx}
                onClick={() => props.handlePersonClick(ndx)}
                onDoubleClick={props.handleSelect}
                title={
                  personInfo.email1 ? personInfo.email1 : "No email available "
                }
              >
                {personInfo.formattedName}
              </div>
            );
          })
        ) : props.state.loading ? (
          <p>Loading...</p>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  };

  const buttons = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-info"
          onClick={props.handleSearch}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.handleSelect}
        >
          Select
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={props.closeBtn}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <section className="person-search">
      <h2>Person Search</h2>
      <div className="person-search-form">
        <fieldset>
          <legend>Search Criteria</legend>
          {inputFields()}
        </fieldset>
        {resultListing()}
        {buttons()}
      </div>
    </section>
  );
};

export default PersonSearch;
