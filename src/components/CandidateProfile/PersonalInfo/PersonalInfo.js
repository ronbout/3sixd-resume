import React from "react";

import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";
import PersonalInfoFooter from "./PersonalInfoFooter";

const PersonalInfo = ({ person, candId, handleUpdate }) => {
  const handleSubmit = personObj => {
    handleUpdate({ person: personObj });
  };
  return (
    <section className="tsd-card personal-info profile-section">
      <ProfileSectionHeader
        headerTitle="Personal Info"
        profilePercentage="20"
        profileSectionCompleted={true}
      />
      <div className="pi-content">
        <PersonalInfoDisp
          formattedName={person.formattedName}
          candId={candId}
        />
        <div id="pi-divider" className="tsd-vdiv" />
        <PersonalInfoForm handleSubmit={handleSubmit} person={person} />
      </div>
      <PersonalInfoFooter />
    </section>
  );
};

export default PersonalInfo;
