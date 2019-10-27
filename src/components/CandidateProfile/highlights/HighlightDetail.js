import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HighlightDetail = props => {
  const { itemDetail, ndx, parms, callBacks } = props;
  return (
    <React.Fragment>
      <div>{ndx + 1}. </div>
      <div
        onClick={() =>
          callBacks.handleRowClick && callBacks.handleRowClick(ndx)
        }
      >
        <textarea
          className={
            !parms.editFlag || parms.editSkillNdx !== ndx ? "dark-disabled" : ""
          }
          rows="2"
          name={"highlight-" + ndx}
          value={itemDetail.highlight}
          onChange={event =>
            callBacks.handleEditHighlight &&
            callBacks.handleEditHighlight(ndx, event)
          }
          disabled={!parms.editFlag || parms.editSkillNdx !== ndx}
        />
      </div>
      <div>
        {parms.includeSummaryButton && (
          <button
            type="button"
            title="Include In Summary"
            className={
              "btn btn-secondary btn-include" +
              (itemDetail.includeInSummary ? " active" : "")
            }
            onClick={() =>
              callBacks.handleIncludeSummary &&
              callBacks.handleIncludeSummary(ndx)
            }
          >
            <FontAwesomeIcon icon="check" />
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default HighlightDetail;
