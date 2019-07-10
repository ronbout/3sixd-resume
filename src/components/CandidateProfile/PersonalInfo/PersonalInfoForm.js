import React from "react";

import PersonSetup from "../../PersonSetup/";

const PersonalInfoForm = props => {
  const handleFormSubmit = ev => {
    // submit is handled at a lower, reusable component
    // data is passed up through handleSubmit
    ev && ev.preventDefault();
  };

  return (
    <div className="personal-form-container">
      <form className="personal-form" onSubmit={handleFormSubmit}>
        <PersonSetup
          person={props.person}
          heading={false}
          handleCancel={props.handlePersonCancel}
          handleSubmit={props.handleSubmit}
          buttons={{ save: true, cancel: true }}
        />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
