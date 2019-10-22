import React from "react";
import { TextField as MdTextField } from "react-md";

const TextField = ({ name, value, type, errMsg, label = "", ...rest }) => {
	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			errorText={errMsg}
			{...rest}
		/>
	);
};

export default TextField;
