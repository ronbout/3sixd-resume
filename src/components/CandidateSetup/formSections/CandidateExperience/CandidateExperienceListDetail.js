import React from "react";

const CandidateExperienceListDetail = props => {
  const { itemDetail, ndx } = props;
  return (
    <React.Fragment>
      <div>
        <input
          type="text"
          size="20"
          name={"experiencetitle-" + ndx}
          value={itemDetail.jobTitle}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="20"
          name={"experiencecompany-" + ndx}
          value={itemDetail.company.name}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="10"
          name={"experiencestartdate-" + ndx}
          value={itemDetail.startDate}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="10"
          name={"experiencestartdate-" + ndx}
          value={itemDetail.endDate ? itemDetail.endDate : "current"}
          disabled
        />
      </div>
    </React.Fragment>
  );
};

export default CandidateExperienceListDetail;
