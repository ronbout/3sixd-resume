import React from "react";

const ProfileImg = props => {
  /**
   *  the image path will eventually come from the props
   *	require(path) will need to change as that is static
   *  const imgPth = "../../assets/img/candidate2.jpg";
   */

  return (
    <div className="personal-image">
      <img
        className="candidate-img"
        src={require("../../assets/img/candidate2.jpg")}
        alt="Candidate"
      />
      <h4>{props.formattedName}</h4>
    </div>
  );
};

export default ProfileImg;
