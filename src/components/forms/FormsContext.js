import React, { useReducer } from "react";

const FormsContext = React.createContext([{}, () => {}]);

const FormsProvider = props => {
	const formState = {
		disableSubmit: false,
		onChangeFn: null,
		onSubmitFn: null,
		errMsg: ""
	};

	const formsReducer = (state, action) => {
		switch (action.type) {
			case "setDisableSubmit":
				return {
					...state,
					disableSubmit: action.payload.error,
					errMsg: action.payload.errMsg
				};
			case "setOnChangeFn":
				return { ...state, onChangeFn: action.payload };
			case "setOnSubmitFn":
				return { ...state, onSubmitFn: action.payload };
			case "setErrMsg":
				return { ...state, errMsg: action.payload };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(formsReducer, formState);

	return (
		<FormsContext.Provider value={{ state, dispatch }}>
			{props.children}
		</FormsContext.Provider>
	);
};

export { FormsContext, FormsProvider };
