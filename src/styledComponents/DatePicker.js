import React from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ value, label = "", className = "", ...rest }) => {
	const classnames = `md-cell ${className}`;

	return (
		<React.Fragment>
			<div>{label}</div>
			<ReactDatePicker
				selected={value}
				label={label}
				className={classnames}
				{...rest}
			/>
		</React.Fragment>
	);
};

export default DatePicker;
