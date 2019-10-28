import React from "react";
import Button from "styledComponents/Button";

const HighlightsFooter = props => {
	return (
		<div className="high-footer profile-section-footer">
			<Button className="profile-save-btn" onClick={props.handleSubmit}>
				SAVE
			</Button>
		</div>
	);
};

export default HighlightsFooter;
