import React from "react";

import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";
import PersonalInfoFooter from "./PersonalInfoFooter";

const PersonalInfo = props => {
  console.log("personalInfo: ", props);
  return (
    <section className="tsd-card personal-info profile-section">
      <ProfileSectionHeader
        headerTitle="Personal Info"
        profilePercentage="20"
        profileSectionCompleted={true}
      />
      <div className="pi-content">
        <PersonalInfoDisp
          formattedName={props.state.formFields.person.formattedName}
        />
        <div id="pi-divider" className="tsd-vdiv" />
        <PersonalInfoForm state={props.state} />
      </div>
      <PersonalInfoFooter />
    </section>
  );
};

export default PersonalInfo;
