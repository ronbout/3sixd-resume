import React, { useState, useLayoutEffect, useEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "../../CandidateSetup/formSections/HighlightsContainer";
import HighlightsFooter from "./HighlightsFooter";
import { objCopy } from "../../../assets/js/library.js";

const Highlights = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  const [highlights, setHighlights] = useState(objCopy(props.highlights));

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  useEffect(() => {
    setHighlights(objCopy(props.highlights));
  }, [props.highlights]);

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "550px" : "0" });
  }, [sliderOpen]);

  const handleSubmit = event => {
    event && event.preventDefault();
    console.log("Highlights api update goes here");
    // api update and then pass new data up
    /***
     *
     * pass new data up
     *
     */
    props.handleUpdate({
      candidateHighlights: highlights
    });
  };

  const handleHighlightChange = highlights => {
    console.log("handle change: ", highlights);
    setHighlights(highlights);
  };

  return (
    <section className="tsd-card highlights profile-section">
      <ProfileSectionHeader
        headerTitle="Candidate Highlights"
        profilePercentage="20"
        profileSectionCompleted={true}
        slider="arrow-down"
        handleSlider={handleSlider}
      />
      <div className="slide-section" style={divStyle}>
        <HighlightsContainer
          highlights={highlights}
          handleHighlightChange={handleHighlightChange}
          includeInSummary={false}
          heading={false}
          candId={props.candId}
        />
        <HighlightsFooter handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Highlights;
