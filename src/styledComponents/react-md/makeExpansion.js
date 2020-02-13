import React from "react";
import { ExpansionPanel } from "react-md";

const makeExpansion = (
	ExpandComponent,
	heading,
	footer = null,
	defaultExpanded = false,
	zDepth = 1,
	onToggle = null
) => {
	return props => {
		return (
			<ExpansionPanel
				label={heading()}
				footer={footer}
				style={{ background: "inherit", width: "100%" }}
				zDepth={zDepth}
				defaultExpanded={defaultExpanded}
				onExpandToggle={onToggle}
			>
				<ExpandComponent {...props} />
			</ExpansionPanel>
		);
	};
};

export default makeExpansion;
