import { useRef, useEffect } from "react";
// usePrevious hook for storing previous value
// any prop or state

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}
