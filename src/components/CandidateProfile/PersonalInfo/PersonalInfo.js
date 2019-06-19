import React from "react";

import PersonalForm from "./PersonalForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";

const PersonalInfo = props => {
  return (
    <section className="tsd-card personal-info">
      <PersonalInfoDisp />
      <PersonalForm />
    </section>
  );
};

export default PersonalInfo;
