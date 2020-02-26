/* ProfileSectionHeader.js */
import React from "react";
import { FontIcon } from "styledComponents/FontIcon";

const ProfileSectionHeader = ({
	headerTitle,
	handleSlider,
	sliderIcon = ""
}) => {
	return (
		<div className="pi-header profile-section-header">
			<span>
				<h2>{headerTitle || "Section Header"}</h2>
			</span>

			{sliderIcon && (
				<span className="slider-arrow" onClick={handleSlider}>
					<FontIcon>{sliderIcon}</FontIcon>
				</span>
			)}
		</div>
	);
};

export default ProfileSectionHeader;
