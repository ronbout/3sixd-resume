import React from "react";
import CandidateCrud from "./CandidateCrud";

import "./css/candidateSetup.css";

const CandidateSetup = props => {
  return (
    <main className="container-fluid candidate-setup">
      <h1>Candidate Entry/Update</h1>
      <CandidateCrud />
    </main>
  );
};

export default CandidateSetup;
