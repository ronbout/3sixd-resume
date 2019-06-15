import React from "react";

const CandidateModal = props => {
  const style = props.showModal
    ? { display: "block", opacity: "1", top: "88px" }
    : { display: "none" };

  const handleClose = () => {
    props.handleCloseModal && props.handleCloseModal();
  };

  return (
    <React.Fragment>
      <div
        className={"modal fade" + (props.showModal ? " show" : "")}
        style={style}
        id={props.idName || "modal"}
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="notesModalLabel"
        aria-hidden={!props.showModal}
        aria-modal={props.showModal}
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="notesModalLabel">
                {props.modalHeader}
              </h5>
            </div>
            {props.children || <h2>Inside Modal</h2>}
            <div className="modal-footer">
              {props.hideClose || (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.showModal && <div className="modal-backdrop fade show" />}
    </React.Fragment>
  );
};

export default CandidateModal;
