import React, { useState, useLayoutEffect, useEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import ObjectiveSummaryForm from "./ObjectiveSummaryForm";
import ObjectiveSummaryFooter from "./ObjectiveSummaryFooter";
import dataFetch from "../../../assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_OBJECTIVE = "/objective";

const ObjectiveSummary = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  const [objective, setObjective] = useState(props.objective);
  const [executiveSummary, setExecutiveSummary] = useState(
    props.executiveSummary
  );

  useEffect(() => {
    setObjective(props.objective);
    setExecutiveSummary(props.executiveSummary);
  }, [props.objective, props.executiveSummary]);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "370px" : "0" });
  }, [sliderOpen]);

  const handleInputChange = event => {
    const target = event.target;
    if (target.name === "objective") {
      setObjective(target.value);
    } else {
      setExecutiveSummary(target.value);
    }
  };

  const handleSubmit = event => {
    event && event.preventDefault();
    console.log("Objective / Summary api update goes here");
    // api update and then pass new data up
    postObjective();
    props.handleUpdate({
      objective,
      executiveSummary
    });
  };

  const postObjective = async () => {
    let body = {
      objective,
      executiveSummary
    };
    const id = props.candId;
    const httpMethod = "PUT";
    const endpoint = `${API_CANDIDATES}${id}${API_OBJECTIVE}`;

    let result = await dataFetch(endpoint, "", httpMethod, body);
    if (result.error) {
      console.log(result.error);
    } else {
      // need user message here
    }
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
        <form onSubmit={handleSubmit}>
          <ObjectiveSummaryForm
            objective={objective}
            executiveSummary={executiveSummary}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <ObjectiveSummaryFooter />
        </form>
      </div>
    </section>
  );
};

export default ObjectiveSummary;
