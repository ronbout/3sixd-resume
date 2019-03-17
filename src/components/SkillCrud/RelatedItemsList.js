import React from "react";

const RelatedItemList = props => {
  return (
    <React.Fragment>
      <h2>{props.heading} List</h2>
      <div className="row">
        <div className="col-sm-4">{props.heading} Name</div>
        <div className="col-sm-5">Description</div>
        <div className="col-sm-1">Delete</div>
      </div>
      {props.items.map((item, ndx) => (
        <div key={item.id} className="row related-row">
          <input
            className="col-sm-4"
            type="text"
            name={"skillrelated-" + ndx}
            value={item.name}
            disabled
          />
          <input
            className="col-sm-5"
            type="text"
            name={"skillrelated-desc-" + ndx}
            value={item.description}
            disabled
          />
          <button
            type="button"
            className="col-sm-1 btn btn-danger"
            onClick={event =>
              props.handleDelItem(props.skillFieldName, ndx, event)
            }
          >
            X
          </button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default RelatedItemList;
