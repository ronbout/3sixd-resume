import React, { useState, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import HighlightsContainer from "../../CandidateSetup/formSections/HighlightsContainer";
//import HighlightsForm from "./HighlightsForm";
import HighlightsFooter from "./HighlightsFooter";

const Highlights = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  console.log("Highlights: ", props);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
    console.log("handle slider: ", sliderOpen);
  };

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "440px" : "0" });
  }, [sliderOpen]);

  /*
  const handleInputChange = event => {
    props.handleInputChange(event);
  };

  const handleSubmit = event => {
    event && event.preventDefault();
    props.handleSubmit();
	};
	*/

  const handleHighlightChange = highlights => {
    console.log("highlight change: ", highlights);
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
          highlights={props.state.formFields.highlights}
          handleHighlightChange={handleHighlightChange}
          includeInSummary={false}
        />
        {/*}
        <HighlightsForm
          formFields={props.state.formFields}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
				*/}
        <HighlightsFooter />
      </div>
    </section>
  );
};

export default Highlights;
