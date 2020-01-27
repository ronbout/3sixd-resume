/* IncompleteInfoMsg.js */
import React from "react";

const IncompleteInfoMsg = ({ compMsg }) => {
	console.log("incomplete compMsg: ", compMsg);
	console.log(typeof compMsg);
	return (
		<div className="comp-msg">
			<p
				style={{
					fontSize: "22px",
					lineHeight: "26px",
					fontWeight: "bold"
				}}
			>
				Your profile is incomplete. With a complete profile, our AI can generate
				an optimal resume based on particular job requirements
			</p>
			<ol>{compMsg.map(m => m)}</ol>
		</div>
	);
};

export default IncompleteInfoMsg;
