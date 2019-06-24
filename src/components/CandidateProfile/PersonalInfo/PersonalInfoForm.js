import React from "react";

import PersonSetup from "../../PersonSetup/";

const PersonalInfoForm = props => {
  return (
    <div className="personal-form-container">
      <form className="personal-form">
        <PersonSetup
          person={props.state.formFields.person}
          heading={false}
          handleCancel={props.handlePersonCancel}
          handleSubmit={props.handlePersonSubmit}
        />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
