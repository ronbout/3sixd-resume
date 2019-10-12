// a large routine to check all the fields of a form
// to see if it can be submitted.
// Took out of formInputs.js due to size

import { isEmail, isUrl, isZipcode } from "./validFns";
import { isArray } from "util";

const inpTypes = [
	"InpString",
	"InpTextAsNumber",
	"InpEmail",
	"InpPassword",
	"InpPhone",
	"InpUrl",
	"InpZip",
	"InpTextArea",
	"InpSwitch"
];

export const checkValidInput = (props, inpName) => {
	const trueObj = { error: false };
	const falseObj = {
		error: true,
		errMsg: `${props.name} field is Invalid`,
		inpName
	};
	let displayName;
	if (props.name.includes("-")) {
		const tmp = props.name.split("-");
		displayName = tmp[tmp.length - 1];
	} else {
		displayName = props.name;
	}
	displayName = props.label ? props.label : displayName;
	if (props.required && !props.value) {
		return { ...falseObj, errMsg: `${displayName}: Required Field`, inpName };
	}
	// check if email
	if (inpName === "InpEmail" && !isEmail(props.value)) {
		return {
			...falseObj,
			errMsg: `${displayName}: Invalid Email Format`,
			inpName
		};
	}
	// check if url
	if (inpName === "InpUrl" && !isUrl(props.value)) {
		return {
			...falseObj,
			errMsg: `${displayName}: Invalid URL Format`,
			inpName
		};
	}
	// check if zipcode
	if (inpName === "InpZip" && !isZipcode(props.value)) {
		return {
			...falseObj,
			errMsg: `${displayName}: Invalid Zipcode Format`,
			inpName
		};
	}
	// check if min/max
	if (
		(props.min || props.min === 0) &&
		props.min !== null &&
		!isNaN(props.min) &&
		props.value < props.min
	) {
		return {
			...falseObj,
			errMsg: `${displayName}: Min Value = ${props.min}`,
			inpName
		};
	}
	if (
		(props.max || props.max === 0) &&
		props.max !== null &&
		!isNaN(props.max) &&
		props.value > props.max
	) {
		return {
			...falseObj,
			errMsg: `${displayName}: Max Value = ${props.max}`,
			inpName
		};
	}
	// check minlength/maxlength
	if (
		props.minlength &&
		!isNaN(props.minlength) &&
		props.value.length < props.minlength
	) {
		return {
			...falseObj,
			errMsg: `${displayName}: Min characters = ${props.minlength}`,
			inpName
		};
	}
	if (
		props.maxlength &&
		!isNaN(props.maxlength) &&
		props.value.length > props.maxlength
	) {
		return {
			...falseObj,
			errMsg: `${displayName}: Max characters = ${props.maxlength}`,
			inpName
		};
	}
	// check here for props.maxDate/min
	let testDt;
	if (props.minDate !== null && !isNaN(Date.parse(props.minDate))) {
		testDt = new Date(props.minDate);
		if (props.value < testDt) {
			return {
				...falseObj,
				errMsg: `${displayName}: Earliest date is ${props.minDate}`,
				inpName
			};
		}
	}
	if (props.maxDate !== null && !isNaN(Date.parse(props.maxDate))) {
		testDt = new Date(props.maxDate);
		if (props.value > testDt) {
			return {
				...falseObj,
				errMsg: `${displayName}: Latest date is ${props.maxDate}`,
				inpName
			};
		}
	}
	return trueObj;
};

export const checkValidForm = children => {
	//console.log("checkValidForm children: ", children);
	// check against the validation props for each element
	// and return true if all pass
	let validForm = { error: false };
	const childCount = children.length;
	for (let i = 0; i < childCount && !validForm.error; i++) {
		//console.log("i of count: ", i, " of ", childCount);
		let child = children[i];
		if (child === undefined) continue;
		if (!child.props) continue;
		if (child.props && child.props.children) {
			if (!isArray(child.props.children)) continue;
			validForm = checkValidForm(child.props.children);
			continue;
		}
		if (!child.type.name) continue;
		const isInput = inpTypes.includes(child.type.name);
		if (!isInput) continue;
		// we have an Input component.  See if it is
		// required and has an empty value
		//console.log("validForm child: ", child);
		const props = child.props;
		validForm = checkValidInput(props, child.type.name);

		//validForm = !props.error
	}

	return validForm;
};

export const getFormInputs = children => {
	let formInputs = [];
	const childCount = children.length;
	for (let i = 0; i < childCount; i++) {
		//console.log("i of count: ", i, " of ", childCount);
		let child = children[i];
		if (child === undefined) continue;
		if (!child.props) continue;
		if (child.props && child.props.children) {
			if (!isArray(child.props.children)) continue;
			formInputs = formInputs.concat(getFormInputs(child.props.children));
			continue;
		}
		if (!child.type.name) continue;
		const isInput = inpTypes.includes(child.type.name);
		if (!isInput) continue;
		// we have an Input component.  Add it to formInputs
		formInputs.push(child);
		//validForm = !props.error
	}

	return formInputs;
};
