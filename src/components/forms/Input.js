import React, { useState, useEffect } from "react";
import TextField from "styledComponents/mui/TextField";
//import { checkValidInput } from "./checkValidForm";
import ErrorMsg from "./ErrorMsg";

const Input = props => {
	const [errFlg, setErrFlg] = useState(false);
	const [errMsg, setErrMsg] = useState(props.errMsg);
	const { performErrCheck, onBlur, onChange, required, ...rest } = props;

	useEffect(() => {
		setErrMsg(props.errMsg);
	}, [props.errMsg]);

	useEffect(() => {
		props.value && checkRequired(props.value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value]);

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

	const handleChange = ev => {
		checkRequired(ev.target.value);
		onChange(ev);
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
		<div>
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
