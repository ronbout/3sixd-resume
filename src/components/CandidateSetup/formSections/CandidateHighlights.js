import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CandidateHighlights = props => {
  const [newHighlight, setNewHightlight] = useState("");

  const passHighlightUp = tmpHighlights => {
    props.handleHighlightChange && props.handleHighlightChange(tmpHighlights);
  };

  const handleOnChange = event => {
    setNewHightlight(event.target.value);
  };

  const handleAddHighlight = () => {
    const tmp = props.formFields.highlights.slice();
    tmp.push(newHighlight);
    setNewHightlight("");
    passHighlightUp(tmp);
  };

  const handleDelHighlight = ndx => {
    const tmp = props.formFields.highlights.slice();
    tmp.splice(ndx, 1);
    passHighlightUp(tmp);
  };

  const handleMoveHighlight = (ndx, newNdx) => {
    const tmp = props.formFields.highlights.slice();
    const tmpHighlight = tmp.splice(ndx, 1)[0];
    tmp.splice(newNdx, 0, tmpHighlight);
    passHighlightUp(tmp);
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
              placeholder="Enter a highlight and click Add"
              value={newHighlight}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-info"
              onClick={handleAddHighlight}
              disabled={newHighlight === ""}
            >
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
        {props.formFields.highlights.map((item, ndx) => (
          <div key={ndx} className="highlight-row">
            <div>{ndx + 1}. </div>
            <div>
              <textarea
                className=""
                rows="2"
                name={"highlight-" + ndx}
                value={item}
                disabled
              />
            </div>

            <div className="">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => handleMoveHighlight(ndx, ndx - 1)}
                disabled={ndx === 0}
              >
                <FontAwesomeIcon icon="arrow-up" />
              </button>
            </div>
            <div className="">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => handleMoveHighlight(ndx, ndx + 1)}
                disabled={ndx === props.formFields.highlights.length - 1}
              >
                <FontAwesomeIcon icon="arrow-down" />
              </button>
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelHighlight(ndx)}
              >
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
