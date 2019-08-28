import React, { useState, useLayoutEffect, useEffect } from "react";

import ProfileSectionHeader from "../ProfileSectionHeader";
import SocialMediaForm from "./SocialMediaForm";
import SocialMediaFooter from "./SocialMediaFooter";
import dataFetch from "../../../assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_SOCIAL = "/social";

const SocialMedia = ({ candId, linkedInLink, githubLink, handleUpdate }) => {
  const [sliderOpen, setSliderOpen] = useState(true);
  const [divStyle, setDivStyle] = useState({ display: "none" });
  const [linkedIn, setLinkedIn] = useState(linkedInLink);
  const [github, setGithub] = useState(githubLink);

  useEffect(() => {
    setLinkedIn(linkedInLink);
    setGithub(githubLink);
  }, [linkedInLink, githubLink]);

  const handleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  useLayoutEffect(() => {
    setDivStyle({ height: sliderOpen ? "370px" : "0" });
  }, [sliderOpen]);

  const handleInputChange = event => {
    const target = event.target;
    if (target.name === "linkedIn") {
      setLinkedIn(target.value);
    } else {
      setGithub(target.value);
    }
  };

  const handleSubmit = event => {
    event && event.preventDefault();
    console.log("socialMedia api update goes here");
    // api update and then pass new data up
    postSocialMedia();
    handleUpdate({
      socialMedia: [
        {
          socialType: "Github",
          socialLink: github
        },
        {
          socialType: "LinkedIn",
          socialLink: linkedIn
        }
      ]
    });
  };

  const postSocialMedia = async () => {
    let body = {
      linkedIn,
      github
    };
    const id = candId;
    const httpMethod = "PUT";
    const endpoint = `${API_CANDIDATES}${id}${API_SOCIAL}`;

    let result = await dataFetch(endpoint, "", httpMethod, body);
    if (result.error) {
      console.log(result.error);
    } else {
      // need user message here
      console.log("successfull update...need error msg component!!!");
    }
  };

  return (
    <section className="tsd-card social profile-section">
      <ProfileSectionHeader
        headerTitle="Social Media Links"
        profilePercentage="15"
        profileSectionCompleted={false}
        slider="arrow-down"
        handleSlider={handleSlider}
      />
      <div className="slide-section" style={divStyle}>
        <form onSubmit={handleSubmit}>
          <SocialMediaForm
            linkedIn={linkedIn}
            github={github}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <SocialMediaFooter />
        </form>
      </div>
    </section>
  );
};

export default SocialMedia;
