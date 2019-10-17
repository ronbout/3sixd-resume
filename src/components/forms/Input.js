import React, { useState, useEffect } from "react";
import TextField from "styledComponents/TextField";
//import { checkValidInput } from "./checkValidForm";
import ErrorMsg from "./ErrorMsg";

const Input = props => {
	const [errFlg, setErrFlg] = useState(false);
	const [errMsg, setErrMsg] = useState(props.errMsg);
	const {
		inpType,
		performErrCheck,
		onBlur,
		onChange,
		required,
		...rest
	} = props;

	//const reqErrMsg = "This field is required";

	useEffect(() => {
		setErrMsg(props.errMsg);
	}, [props.errMsg]);

	/*
	useEffect(() => {
		let reqErr = false;
		//const valid = checkValidInput(props, inpType);
		const valid = true;
		setErrFlg(!valid);
		props.value && (reqErr = checkRequired(props.value));
		setErrFlg(reqErr || !valid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value]);
*/

	useEffect(() => {
		setErrFlg(errMsg === true);
	}, [errMsg]);

	/*
	const checkRequired = val => {
		if (required && val.length === 0) {
			setErrMsg(reqErrMsg);
			return true;
		} else {
			if (errMsg === reqErrMsg) {
				setErrMsg("");
			}
			return false;
		}
	};
*/

	const handleChange = ev => {
		//checkRequired(ev.target.value);
		onChange(ev);
	};

	const handleOnBlur = ev => {
		const inputVal = ev.target.value;
		//const reqFlg = checkRequired(inputVal);
		//!reqFlg && performErrCheck && performErrCheck(inputVal);
		performErrCheck && performErrCheck(inputVal);
		onBlur && onBlur(ev);
	};

	const handleKeyDown = ev => {
		const key = ev.key;
		if (key === "Enter") {
			ev.preventDefault();
		}
	};

	return (
		<div className="input-div">
			<TextField
				error={errFlg}
				onBlur={handleOnBlur}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...rest}
			/>
			{errMsg ? <ErrorMsg errMsg={errMsg} /> : <p></p>}
		</div>
	);
};

export default Input;
