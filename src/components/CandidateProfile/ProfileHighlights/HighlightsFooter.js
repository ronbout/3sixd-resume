import React from "react";
import Button from "styledComponents/Button";

const HighlightsFooter = ({ handleSubmit, disableSubmit, handleCancel }) => {
	return (
		<div className="high-footer profile-section-footer">
			<Button
				className="profile-save-btn"
				onClick={handleSubmit}
				disabled={disableSubmit}
			>
				SAVE
			</Button>
			<Button
				btnType="secondary"
				style={{ marginLeft: "26px" }}
				onClick={handleCancel}
				disabled={disableSubmit}
			>
				Cancel
			</Button>
		</div>
	);
};

export default HighlightsFooter;
