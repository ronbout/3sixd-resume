import React from "react";
import { ExpansionPanel } from "react-md";

const makeExpansion = (
	ExpandComponent,
	heading,
	footer = null,
	defaultExpanded = false
) => {
	return props => {
		return (
			<ExpansionPanel
				label={heading()}
				footer={footer}
				style={{ background: "inherit", width: "100%" }}
				defaultExpanded={defaultExpanded}
			>
				<ExpandComponent {...props} />
			</ExpansionPanel>
		);
	};
};

export default makeExpansion;
