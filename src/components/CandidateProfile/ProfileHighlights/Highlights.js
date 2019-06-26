import React, { useState, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "../../CandidateSetup/formSections/HighlightsContainer";
import HighlightsFooter from "./HighlightsFooter";

const Highlights = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  const [highlights, setHighlights] = useState(props.highlights);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

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
      highlights
    });
  };

  const handleHighlightChange = highlights => {
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
        />
        <HighlightsFooter handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Highlights;
