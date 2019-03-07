import React, { Component } from "react";

// IE polyfill for includes function
// ******** need to create a library of reusable functions
// move this into that.
/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, "includes", {
    value: function(search, start) {
      if (typeof start !== "number") {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    }
  });
}

const API_BASE = "http://localhost/3sixd/api/";
const API_TAGS = "tags";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

const clearFormFields = {
  formFields: {
    keyword: "",
    tagSelect: 0
  }
};

class TechtagSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...clearFormFields
    };
  }

  componentDidMount() {
    // need to load techtags.  just load once.
    // they are not being updated programmatically
    this.loadTechtags();
  }

  loadTechtags() {
    const apiUrl = `${API_BASE}${API_TAGS}${API_QUERY}`;
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
            tagOptions: result ? result : []
          });
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: target.value
      }
    });
  };

  render() {
    return (
      <section className="tag-select">
        <h2>Tags</h2>
        {/* search field for techtags which will filter select */}
        <div className="form-group">
          <label htmlFor="keyword">Search Tags</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="keyword"
            id="keyword"
            value={this.state.formFields.keyword}
            onChange={this.handleInputChange}
          />
        </div>
        {/* Techtag List returned from api */}
        <div className="form-group">
          <select
            className="form-control"
            size="18"
            name="tagSelect"
            id="tagSelect"
            value={this.state.formFields.tagSelect}
            onChange={this.handleInputChange}
          >
            {this.state.tagOptions &&
              this.state.tagOptions
                .filter(tag => {
                  return (
                    this.state.formFields.keyword === "" ||
                    tag.name
                      .toLowerCase()
                      .includes(this.state.formFields.keyword.toLowerCase())
                  );
                })
                .map((tagInfo, ndx) => {
                  return (
                    <option
                      key={ndx}
                      value={ndx}
                      onDoubleClick={this.handleSelect}
                      title={
                        tagInfo.description
                          ? tagInfo.description
                          : "No description available "
                      }
                    >
                      {tagInfo.name}
                    </option>
                  );
                })}
          </select>
        </div>
      </section>
    );
  }
}

export default TechtagSelect;
