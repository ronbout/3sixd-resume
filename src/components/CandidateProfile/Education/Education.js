import React, { useState, useEffect, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateEducationContainer from "../../CandidateSetup/formSections/CandidateEducation/";
import EducationFooter from "./EducationFooter";
import { objCopy } from "../../../assets/js/library.js";

const Education = props => {
  const [education, setEducation] = useState(objCopy(props.education));
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });

  useEffect(() => {
    setEducation(objCopy(props.education));
  }, [props.education]);

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "440px" : "0" });
  }, [sliderOpen]);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  const handleEducationChange = education => {
    props.handleUpdate({
      education
    });
  };

  return (
    <section className="tsd-card Education profile-section">
      <ProfileSectionHeader
        headerTitle="Candidate Education"
        profilePercentage="20"
        profileSectionCompleted={true}
        slider="arrow-down"
        handleSlider={handleSlider}
      />
      <div className="slide-section" style={divStyle}>
        <CandidateEducationContainer
          education={education}
          candId={props.candId}
          handleEducationChange={handleEducationChange}
        />
        <EducationFooter />
      </div>
    </section>
  );
};

export default Education;
