import React from "react";
import RadioBase from "styledComponents/RadioBase";

const Radio = props => {
	const { name, onBlur, ...rest } = props;

	const handleOnBlur = ev => {
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
			<RadioBase
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				name={name}
				{...rest}
			/>
		</div>
	);
};

export default Radio;