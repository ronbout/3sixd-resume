import React, { useState, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateExperience from "../../CandidateSetup/formSections/CandidateExperience/";
//import ExperienceForm from "./ExperienceForm";
import ExperienceFooter from "./ExperienceFooter";

const Experience = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  console.log("Experience: ", props);

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

  const handleExperienceChange = Experience => {
    console.log("experience change: ", Experience);
  };

  return (
    <section className="tsd-card Experience profile-section">
      <ProfileSectionHeader
        headerTitle="Candidate Experience"
        profilePercentage="20"
        profileSectionCompleted={true}
        slider="arrow-down"
        handleSlider={handleSlider}
      />
      <div className="slide-section" style={divStyle}>
        <CandidateExperience
          formFields={props.state.formFields}
          handleExperienceChange={handleExperienceChange}
        />
        <ExperienceFooter />
      </div>
    </section>
  );
};

export default Experience;
