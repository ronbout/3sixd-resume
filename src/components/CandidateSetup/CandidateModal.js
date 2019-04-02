import React from "react";

const CandidateModal = props => {
  return (
    <div
      className="modal fade"
      id="notesModal"
      data-backdrop="static"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="notesModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="notesModalLabel">
              Modal Header
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
          {props.children || <h2>Inside Modal</h2>}
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
  );
};

export default CandidateModal;
