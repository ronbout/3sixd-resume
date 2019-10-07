import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

const PhoneFieldUI = ({ name, value, errMsg, label = "", ...rest }) => {
	return <PhoneInput name={name} value={value} label={label} {...rest} />;
};

export default PhoneFieldUI;
