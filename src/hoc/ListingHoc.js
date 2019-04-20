import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListingHoc = (
  DetailComponent,
  data,
  actions = {},
  detailClassname = "row"
) => {
  return (
    <React.Fragment>
      {data.map((row, ndx) => {
        return (
          <div key={ndx} className={detailClassname}>
            <DetailComponent itemDetail={row} ndx={ndx} />
            {actions.move && moveButtons(ndx)}
            {actions.delete && deleteButton(ndx)}
            {actions.edit && editButton(ndx)}
          </div>
        );
      })}
    </React.Fragment>
  );

  function moveButtons(ndx) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          title="Move Row up"
          onClick={() => actions.move(ndx, ndx - 1)}
          disabled={ndx === 0}
        >
          <FontAwesomeIcon icon="arrow-up" />
        </button>
        <button
          type="button"
          className="btn btn-success"
          title="Move highlight Down"
          onClick={() => actions.move(ndx, ndx + 1)}
          disabled={ndx === data.length - 1}
        >
          <FontAwesomeIcon icon="arrow-down" />
        </button>
      </div>
    );
  }

  function deleteButton(ndx) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-danger"
          title="Delete Row"
          onClick={() => actions.delete(ndx)}
        >
          X
        </button>
      </div>
    );
  }

  function editButton(ndx) {
    return (
      <div>
        <button
          type="button"
          title="Edit Row"
          className="btn btn-info"
          onClick={() => actions.edit(ndx)}
        >
          <FontAwesomeIcon icon="edit" />
        </button>
      </div>
    );
  }
};

export default ListingHoc;
