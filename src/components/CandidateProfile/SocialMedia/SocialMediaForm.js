import React from "react";

const SocialMediaForm = ({ linkedIn, github, handleInputChange }) => {
  return (
    <div className="social-form">
      <label>Github:</label>
      <input
        type="text'"
        className=""
        name="github"
        value={github}
        onChange={handleInputChange}
      />
      <label>LinkedIn:</label>
      <input
        type="text"
        className=""
        name="linkedIn"
        value={linkedIn}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SocialMediaForm;
