import React from "react";

import SkillList from "../../SkillSetup/SkillList";
import ListingHoc from "../../hoc/ListingHoc";
import HighlightDetail from "./HighlightDetail";

const HighlightsForm = props => {
  const {
    actions,
    highlights,
    showSkillsFlag,
    newHighlight,
    editFlag,
    editSkillNdx,
    includeInSummary,
    heading,
    listingCallbacks,
    skills
  } = props;

  const addHighlight = () => {
    return (
      <div className="add-highlight">
        {heading && <h2>{heading}</h2>}
        <div className="highlight-row">
          <div />
          <div>
            <textarea
              className=""
              rows="2"
              maxLength="200"
              name="newHighlight"
              placeholder="Enter a highlight and click Add"
              value={newHighlight}
              onChange={props.handleOnChange}
            />
          </div>
          <div />
          <div>
            <button
              type="button"
              className="btn btn-info"
              onClick={props.handleAddHighlight}
              disabled={newHighlight === ""}
            >
              Add
            </button>
          </div>
          <div />
          <div />
        </div>
      </div>
    );
  };

  const highlightList = () => {
    const sortHighlights = highlights.sort((a, b) => a.sequence - b.sequence);
    // setup current parms for listing hoc
    const listingParms = {
      editFlag,
      editSkillNdx,
      includeSummaryButton: includeInSummary === true ? true : false
    };
    return (
      <div className="highlight-list justify-content-center">
        <ListingHoc
          data={sortHighlights}
          actions={actions}
          detailClassname="highlight-row"
          callBacks={listingCallbacks}
          parms={listingParms}
        >
          <HighlightDetail />
        </ListingHoc>
      </div>
    );
  };

  const displaySkills = () => {
    return (
      <div className="skill-edit-list">
        <SkillList
          skills={skills}
          editFlag={editFlag}
          handleSkillsChange={props.handleSkillsChange}
        />
      </div>
    );
  };

  return (
    <section className="candidate-highlights candidate-tab-section">
      {addHighlight()}
      {highlights && highlightList()}
      {showSkillsFlag && displaySkills()}
    </section>
  );
};

export default HighlightsForm;
