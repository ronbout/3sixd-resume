import React, { useReducer } from "react";
import { candidateInfo } from "./dummyData";
import { objCopy } from "assets/js/library";

// CompObjContext will allow candidate profile info to move between sections
// w/o re-rendering the individual sections, allowing the
// Completion Object and Msg to be updated

const CompObjContext = React.createContext([{}, () => {}]);

const CompObjProvider = props => {
	const compObjState = {
		...candidateInfo
	};

	const compObjReducer = (state, action) => {
		switch (action.type) {
			case "UPDATE_CAND":
				console.log("heree!!!!");
				console.log("state: ", state);
				console.log("action: ", action);
				const newState = {
					...objCopy(state),
					...action.payload
				};
				return newState;
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(compObjReducer, compObjState);

	return (
		<CompObjContext.Provider value={{ state, dispatch }}>
			{props.children}
		</CompObjContext.Provider>
	);
};

export { CompObjContext, CompObjProvider };
