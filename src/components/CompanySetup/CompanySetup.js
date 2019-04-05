import React, { Component } from "react";

class CompanySetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "hmm..."
    };
  }

  render() {
    return (
      <section className="company-setup">
        <h1>Company Setup</h1>
      </section>
    );
  }
}

export default CompanySetup;
