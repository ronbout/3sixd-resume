import React from "react";
import { TextField as MdTextField } from "react-md";

const TextField = ({
	name,
	value,
	type,
	errMsg,
	label = "",
	reqWarn = false,
	...rest
}) => {
	const style =
		reqWarn && !value
			? {
					inputStyle: { border: "2px solid red", padding: "8px" },
					className: "warning"
			  }
			: {};
	return (
		<MdTextField
			name={name}
			value={value}
			type={type}
			label={label}
			errorText={errMsg}
			{...style}
			{...rest}
		/>
	);
};

export default TextField;
