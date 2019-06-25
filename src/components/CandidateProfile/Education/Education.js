import React, { useState, useLayoutEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import CandidateEducation from "../../CandidateSetup/formSections/CandidateEducation/";
import EducationFooter from "./EducationFooter";

const Education = props => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  console.log("Education: ", props);

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

  const handleEducationChange = Education => {
    console.log("Education change: ", Education);
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
        <CandidateEducation
          formFields={props.state.formFields}
          handleEducationChange={handleEducationChange}
        />
        <EducationFooter />
      </div>
    </section>
  );
};

export default Education;
