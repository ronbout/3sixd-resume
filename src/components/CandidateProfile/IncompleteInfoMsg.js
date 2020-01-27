/* IncompleteInfoMsg.js */
import React, { useState, useEffect, useContext } from "react";
import { calcPercentComplete } from "./calcPercentComplete";
import { buildCompMsg } from "./buildCompMsg";
import { CompObjContext } from "./CompObjContext";

const IncompleteInfoMsg = ({ candidateInfo }) => {
	const { state, dispatch } = useContext(CompObjContext);
	const [compMsg, setCompMsg] = useState([]);

	useEffect(() => {
		dispatch({
			type: "UPDATE_CAND",
			payload: candidateInfo
		});
	}, [candidateInfo, dispatch]);

	useEffect(() => {
		if (state.id) {
			const compObj = calcPercentComplete(state);
			setCompMsg(buildCompMsg(compObj));
		}
	}, [state]);

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
