import React from "react";
import SwitchUI from "styledComponents/mui/SwitchUI";

const Switch = props => {
	const { inpType, name, onBlur, ...rest } = props;

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
			<SwitchUI
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				value={name}
				{...rest}
			/>
		</div>
	);
};

export default Switch;
