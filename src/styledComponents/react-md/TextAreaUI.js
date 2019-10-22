import React from "react";
import { TextField as MdTextField } from "react-md";

const TextAreaUI = ({
	name,
	value,
	type,
	rows = 1,
	errMsg,
	label = "",
	...rest
}) => {
	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			rows={rows}
			errorText={errMsg}
			{...rest}
		/>
	);
};

export default TextAreaUI;
