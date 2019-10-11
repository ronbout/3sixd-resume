import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "styledComponents/Button";
import UserModalMsg from "components/UserModalMsg";
import { objCopy, deepCompare } from "assets/js/library";
import { FormsContext } from "./FormsContext";

/**
 *
 * This is the useForm Hook
 * @param {*} startValues
 * @param {*} clearValues
 * @param {*} submitCb
 */
export const useForm = (startValues, clearValues, submitCb, validCb) => {
	const [values, setValues] = useState(objCopy(startValues));
	const [origValues, setOrigValues] = useState(objCopy(startValues));
	const [dispModalMsg, setDispModalMsg] = useState(false);
	const [dirtyMsgString, setDirtyMsgString] = useState("clear the form");
	const [errors, setErrors] = useState([]);
	const { state, dispatch } = useContext(FormsContext);

	const clearForm = () => {
		setValues({ ...clearValues });
		setOrigValues({ ...objCopy(clearValues) });
		setDispModalMsg(false);
	};

	const cancelForm = () => {
		setValues({ ...origValues });
	};

	const closeModalMsg = () => {
		setDispModalMsg(false);
	};

	const [msgBtns, setMsgBtns] = useState([
		{
			display: "Yes",
			action: clearForm
		},
		{
			display: "No",
			action: closeModalMsg
		}
	]);

	useEffect(() => {
		setOrigValues(objCopy(startValues));
		setValues(objCopy(startValues));
	}, [startValues]);

	/**
	 * These are the methods that can be performed on the form
	 * and its input elements
	 */
	const submitForm = useCallback(
		ev => {
			ev.preventDefault();
			const errorList = validCb ? validCb(values) : [];
			errorList && errorList.length && setErrors(errorList);
			if (!errorList.length) {
				setOrigValues(objCopy(values));
				console.log("useForm submit: ", values);
				submitCb(values);
			}
		},
		[submitCb, values, validCb]
	);

	const handleChange = React.useCallback(ev => {
		let field = ev.target.name;
		const val =
			ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
		// some of the more advanced forms have objects within objects,
		// which would not work with the standard handle input routine
		// in those cases, the input field's name will contain the
		// subObject name and the field name separated by a hyphen
		// i.e. name="person-name" is values.person.name in the data

		if (field.indexOf("-") !== -1) {
			setValues(prev => {
				let tmpValues = objCopy(prev);
				const targetName = field.split("-");
				tmpValues[targetName[0]][targetName[1]] = val;
				return tmpValues;
			});
		} else {
			setValues(prev => {
				return { ...prev, [field]: val };
			});
		}
	}, []);

	useEffect(() => {
		dispatch({ type: "setOnChangeFn", payload: handleChange });
		dispatch({ type: "setOnSubmitFn", payload: submitForm });
	}, [dispatch, submitForm, handleChange]);

	/**
	 * This is the code for the dirty form check
	 */

	// this function can be called to check if form is dirty
	const checkDirtyForm = () => {
		return deepCompare(origValues, values) ? false : true;
	};

	const checkDirtyFormCallbk = callBk => {
		const dirty = checkDirtyForm();
		if (dirty) {
			openModalMsg();
		} else {
			callBk();
		}
		return dirty;
	};

	const openModalMsg = () => {
		setDispModalMsg(true);
	};

	const dirtyMsg = dispModalMsg ? (
		<div>
			<UserModalMsg
				heading="Warning"
				subHeading={`You have unsaved changes`}
				msgBody={`Do you still want to ${dirtyMsgString}?`}
				btns={msgBtns}
				closeModalMsg={closeModalMsg}
			/>
		</div>
	) : (
		""
	);

	/**
	 * These are the jsx Components
	 */

	const BtnSubmit = props => {
		const disp = props.children ? props.children : "Submit";
		const disabled = props.disabled || state.disableSubmit;
		return (
			<Button
				onClick={submitForm}
				{...props}
				disabled={disabled}
				tooltip={state.errMsg}
			>
				{disp}
			</Button>
		);
	};

	const BtnClear = ({ children = "Clear", checkDirty = false, ...props }) => {
		const onClick = checkDirty
			? () => {
					setDirtyMsgString("clear the form");
					setMsgBtns(prev => {
						let [btn1, btn2] = prev;
						btn1 = {
							...btn1,
							action: () => {
								clearForm();
								setDispModalMsg(false);
							}
						};
						return [btn1, btn2];
					});
					checkDirtyFormCallbk(clearForm);
			  }
			: clearForm;

		return (
			<Button
				type="button"
				btnType="warning"
				onClick={onClick}
				onMouseDown={onClick}
				{...props}
			>
				{children}
			</Button>
		);
	};

	const BtnCancel = ({
		children = "Cancel",
		checkDirty = false,
		onCancel = cancelForm,
		...props
	}) => {
		const onClick = checkDirty
			? () => {
					setDirtyMsgString("cancel");
					setMsgBtns(prev => {
						let [btn1, btn2] = prev;
						btn1 = {
							...btn1,
							action: () => {
								onCancel();
								setDispModalMsg(false);
							}
						};
						return [btn1, btn2];
					});
					checkDirtyFormCallbk(onCancel);
			  }
			: onCancel;
		return (
			<Button
				type="button"
				btnType="secondary"
				onClick={onClick}
				onMouseDown={onClick}
				{...props}
			>
				{children}
			</Button>
		);
	};

	return {
		formFields: values,
		clearForm,
		BtnSubmit,
		BtnClear,
		BtnCancel,
		checkDirtyForm,
		dirtyMsg,
		errors
	};
};

/**
 * End of UseForm Hook
 */
