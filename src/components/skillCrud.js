import React, { Component } from "react";
import TechtagSelect from "./techtagSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_BASE = "http://localhost/3sixd/api/";
const API_SKILL = "skills";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

const clearFormFields = {
  formFields: {
    id: "",
    name: "",
    description: "",
    url: ""
  }
};

class SkillCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...clearFormFields,
      errMsg: "",
      userMsg: ""
    };
    this.state.origForm = this.state.formFields;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.skillInfo !== prevProps.skillInfo) {
      let formFields = this.props.skillInfo
        ? this.props.skillInfo
        : clearFormFields;

      this.setState({
        formFields: { ...formFields },
        origForm: { ...formFields }
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    // clear out any error msg
    this.setState({ errMsg: "", userMsg: "" });
    console.log("submit", this.state.formFields);

    let body = {
      ...this.state.formFields
    };
    // need to know if this is a new skill or update
    // (post vs put)
    const id = this.state.formFields.id;
    const httpMethod = id ? "put" : "post";
    const basicUrl =
      (id ? `${API_BASE}${API_SKILL}/${id}` : `${API_BASE}${API_SKILL}`) +
      API_QUERY;
    let httpConfig = {
      method: httpMethod,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(basicUrl, httpConfig)
      .then(response => {
        response.json().then(result => {
          result = result.data;
          // figure out what to do here
          if (result.error) {
            this.setState({
              errMsg:
                result.errorCode === 45001
                  ? `User ${
                      this.props.user.userName
                    } already has a skill named ${this.state.formFields.name}.`
                  : "An unknown error has occurred"
            });
          } else {
            // success.  let user know and clear out form
            this.setState({
              ...this.clearFormFields,
              userMsg: `Skill "${this.state.formFields.name}" has been ${
                httpMethod === "post" ? "created." : "updated."
              }`
            });
            this.props.handleChangeMode(1);
          }
        });
      })
      .catch(error => {
        console.log("Fetch error: ", error);
      });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let errs = {};
    this.setState({
      formFields: {
        ...this.state.formFields,
        [target.name]: value
      },
      ...errs
    });
  };

  handleClear = () => {
    this.setState({
      ...clearFormFields,
      errMsg: "",
      userMsg: "",
      origForm: clearFormFields.formFields
    });
  };

  render() {
    return (
      <div className="skill-container">
        <form className="basic-skill-form" onSubmit={this.handleSubmit}>
          <input type="hidden" name="id" value={this.state.formFields.id} />
          <div className="basic-skill-container container-fluid d-flex flex-column justify-content-center">
            <div className="skill-desc-form-section">
              <h2>Skill View/Entry</h2>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="name">
                  Skill Name: *
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={this.state.formFields.name}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <p>( * - required field )</p>
                </div>
              </div>
              <div className="form-group row">
                <label
                  className="col-sm-3 col-form-label"
                  htmlFor="description"
                >
                  Description:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={this.state.formFields.description}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label" htmlFor="url">
                  Description:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="url"
                    id="url"
                    value={this.state.formFields.url}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            {
              // Separate Tags and Related Skills Section
            }
            <div className="skill-related-form-section">
              <h2>Techtags and Related Skills</h2>
              <TechtagSelect />
            </div>
            {
              // Button Section
            }
            <div className="fs-btn-container" style={{ textAlign: "center" }}>
              <button
                className="btn btn-primary"
                disabled={this.state.formFields.name === ""}
              >
                {this.state.formFields.id === "" ? "Add skill" : "Update skill"}
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleClear}
              >
                Clear
              </button>
            </div>
          </div>
          {this.state.userMsg && (
            <div className="skill-basic-confirm">{this.state.userMsg}</div>
          )}
          {this.state.errMsg && (
            <div className="skill-basic-error">{this.state.errMsg}</div>
          )}
          <div
            className="modal fade"
            id="notesModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="notesModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="notesModalLabel">
                    Notes{" "}
                    {this.state.formFields.name !== "" &&
                      "for " + this.state.formFields.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body notes-modal">
                  <label>
                    <textarea
                      cols="45"
                      rows="10"
                      name="notes"
                      id="notes"
                      placeholder="Enter useful information about the skill such as preparation tips"
                      value={this.state.formFields.notes}
                      onChange={this.handleInputChange}
                    />
                  </label>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SkillCrud;
