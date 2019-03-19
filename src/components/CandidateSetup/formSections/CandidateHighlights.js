import React, { useState } from "react";

const CandidateHighlights = props => {
  const [newHighlight, setNewHightlight] = useState("");
  const [highlights, setHighlights] = useState(props.formFields.highlights);

  const handleOnChange = event => {
    setNewHightlight(event.target.value);
  };

  return (
    <section className="candidate-highlights candidate-tab-section">
      <div className="add-highlight">
        <h3>Add a Highlight</h3>
        <div className="form-group row">
          <div className="col-9">
            <textarea
              className="form-control"
              rows="2"
              maxLength="200"
              name="newHighlight"
              className="formControl"
              placeholder="Enter a highlight and click Add"
              value={newHighlight}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-1">
            <button type="button" className="btn btn-info">
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="highlightList justify-content-center">
        <h2>Highlights</h2>
        <div className="row">
          <div className="col-8">Highlight</div>
          <div className="col-2">Move</div>
          <div className="col-1">Delete</div>
        </div>
        {highlights.map((item, ndx) => (
          <div key={ndx} className="row highlight-row">
            <textarea
              className="col-8"
              rows="2"
              name={"highlight-" + ndx}
              value={item}
              disabled
            />
            <div className="col-1">
              <button className="btn btn-success" type="button">
                Up
              </button>
            </div>
            <div className="col-1">
              <button className="btn btn-success" type="button">
                Down
              </button>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-danger">
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CandidateHighlights;
