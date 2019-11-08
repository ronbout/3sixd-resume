import React from "react";
import Button from "styledComponents/Button";

const HighlightsFooter = ({ handleSubmit, disableSubmit }) => {
	return (
		<div className="high-footer profile-section-footer">
			<Button
				className="profile-save-btn"
				onClick={handleSubmit}
				disabled={disableSubmit}
			>
				SAVE
			</Button>
		</div>
	);
};

export default HighlightsFooter;
