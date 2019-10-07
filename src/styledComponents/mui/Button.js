import React from "react";
import MuiButton from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * material-ui mumbo jumbo
 */

const Button = ({
	variant = "contained",
	color = "primary",
	tooltip = "",
	...rest
}) => {
	if (tooltip) {
		return (
			<Tooltip title={tooltip} placement="top-end">
				<span>
					<MuiButton variant={variant} color={color} {...rest} />
				</span>
			</Tooltip>
		);
	} else {
		return <MuiButton variant={variant} color={color} {...rest} />;
	}
};

export default Button;
