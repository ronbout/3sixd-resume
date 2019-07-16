import React, { useState, useEffect, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateExperienceContainer from "../../CandidateSetup/formSections/CandidateExperience/";
import ExperienceFooter from "./ExperienceFooter";
import { objCopy } from "../../../assets/js/library.js";

const Experience = props => {
  const [experience, setExperience] = useState(objCopy(props.experience));
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });

  useEffect(() => {
    setExperience(objCopy(props.experience));
  }, [props.experience]);

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "440px" : "0" });
  }, [sliderOpen]);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  const handleExperienceChange = experience => {
    props.handleUpdate({
      experience
    });
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
        <CandidateExperienceContainer
          experience={experience}
          candId={props.candId}
          handleExperienceChange={handleExperienceChange}
        />
        <ExperienceFooter />
      </div>
    </section>
  );
};

export default Experience;
