import React, { useState, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import ObjectiveSummaryFooter from "./ObjectiveSummaryFooter";

const ObjectiveSummary = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  console.log("objectiveSummary: ", props);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
    console.log("handle slider: ", sliderOpen);
  };

  useLayoutEffect(() => {
    console.log("layout effect: ", sliderOpen);
    setDivStyle({ height: sliderOpen ? "370px" : "0" });
  }, [sliderOpen]);

  const handleInputChange = event => {
    props.handleInputChange(event);
  };

  const handleSubmit = event => {
    event && event.preventDefault();
    props.handleSubmit();
  };

  return (
    <section className="tsd-card objective-summary profile-section">
      <ProfileSectionHeader
        headerTitle="Objective / Executive Summary"
        profilePercentage="15"
        profileSectionCompleted={false}
        slider="arrow-down"
        handleSlider={handleSlider}
      />
      <div className="slide-section" style={divStyle}>
        <ObjectiveSummaryForm
          formFields={props.state.formFields}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ObjectiveSummaryFooter />
      </div>
    </section>
  );
};

export default ObjectiveSummary;
