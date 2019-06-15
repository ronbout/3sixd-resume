import React from "react";

const CandidateEducationListDetail = props => {
  const { itemDetail, ndx } = props;
  return (
    <React.Fragment>
      <div>
        <input
          type="text"
          size="26"
          name={"degreename-" + ndx}
          value={itemDetail.degreeName}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="30"
          name={"schoolname-" + ndx}
          value={itemDetail.schoolName}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="10"
          name={"educationstartdate-" + ndx}
          value={itemDetail.startDate}
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          size="10"
          name={"educationstartdate-" + ndx}
          value={itemDetail.endDate}
          disabled
        />
      </div>
    </React.Fragment>
  );
};

export default CandidateEducationListDetail;
