import React, { useState, useEffect } from "react";
import TextAreaUI from "../../styles/mui/TextAreaUI";
import { checkValidInput } from "./checkValidForm";
import ErrorMsg from "./ErrorMsg";

const Input = props => {
	const [errFlg, setErrFlg] = useState(false);
	const [errMsg, setErrMsg] = useState(props.errMsg);
	const { inpType, performErrCheck, onBlur, required, label, ...rest } = props;

	useEffect(() => {
		setErrMsg(props.errMsg);
	}, [props.errMsg]);

	useEffect(() => {
		const valid = checkValidInput(props, inpType);
		setErrFlg(!valid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

	useEffect(() => {
		setErrFlg(errMsg === true);
	}, [errMsg]);

	const checkRequired = val => {
		if (required && val.length === 0) {
			setErrMsg("This field is required");
			return true;
		} else {
			if (errMsg) {
				setErrMsg("");
			}
			return false;
		}
	};

	const handleOnBlur = ev => {
		const inputVal = ev.target.value;
		const reqFlg = checkRequired(inputVal);
		!reqFlg && performErrCheck && performErrCheck(ev.target.value);
		onBlur && onBlur(ev);
	};

	const handleKeyDown = ev => {
		const key = ev.key;
		if (key === "Enter") {
			ev.preventDefault();
		}
	};

	return (
		<div className="textarea MuiFormControl-root MuiTextField-root">
			<TextAreaUI
				error={errFlg}
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				{...rest}
			/>
			<ErrorMsg errMsg={errMsg} />
		</div>
	);
};

export default Input;
