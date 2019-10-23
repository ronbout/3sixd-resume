import React, { useState } from "react";
import { Snackbar as MdSnackbar } from "react-md";

const Snackbar = ({
	text,
	action = null,
	autohide = true,
	timeout = null,
	closeCallBk
}) => {
	const [toasts, setToasts] = useState([{ text, action }]);

	const removeToast = () => {
		setToasts([]);
		//closeCallBk();
	};

	return (
		<MdSnackbar
			id="snackbar"
			toasts={toasts}
			autohide={autohide}
			onDismiss={removeToast}
			autohideTimeout={3000}
		/>
	);
};

export default Snackbar;
