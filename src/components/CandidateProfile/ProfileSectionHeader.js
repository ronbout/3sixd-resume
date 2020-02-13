/* ProfileSectionHeader.js */
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileSectionHeader = props => {
	return (
		<div className="pi-header profile-section-header">
			<span>
				<h2>{props.headerTitle || "Section Header"}</h2>
			</span>

			{/*props.sliderIcon && false && (
				<span className="slider-arrow" onClick={props.handleSlider}>
					<FontAwesomeIcon icon={props.sliderIcon} />
				</span>
			)*/}
		</div>
	);
};

export default ProfileSectionHeader;
