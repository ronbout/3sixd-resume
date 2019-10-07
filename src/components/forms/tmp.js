// const buildValObjs = children => {
// 	/**
// 	 *
// 	 * indyValObj is the validation object for the
// 	 * individual inputs of a form
// 	 * build it w reduce inside this recursive fn
// 	 *
// 	 */
// 	let inpObj;
// 	let valObjs = children.reduce((valArray, child) => {
// 		if (child.props.children) {
// 			if (!isArray(child.props.children)) return valArray;
// 			valArray = [...valArray, ...buildValObjs(child.props.children)];
// 			return valArray;
// 		}
// 		// check if this is one of the InpXXX components
// 		if (!child.type.name) return valArray;
// 		inpObj = inpTypes.find(inp => {
// 			return child.type.name && inp.name === child.type.name;
// 		});
// 		if (!inpObj) return valArray;
// 		// we have an Input Component, build the validation rules
// 		// as an object and push onto valArray ()
// 		const validProps = getValidProps(child.props);
// 		const obj = {
// 			name: child.type.name,
// 			val: inpObj.valFn.concat(validProps)
// 		};
// 		valArray.push(obj);
// 		return valArray;
// 	}, []);

// 	return valObjs;
// };
