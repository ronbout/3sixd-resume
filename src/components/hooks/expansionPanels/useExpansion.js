/* useExpansion */
import React, { useState, useLayoutEffect } from "react";

/**
 * replacement for the react-md expansion panels
 * This version will NOT unmount when not displayed.
 */

const useExpansion = (
	ExpandComponent,
	heading,
	footer = null,
	defaultExpanded = false,
	zDepth = 1,
	divHeight = "600px"
) => {
	const [sliderOpen, setSliderOpen] = useState(defaultExpanded);
	const [divStyle, setDivStyle] = useState({ display: "none" });
	const [sliderIcon, setSliderIcon] = useState(
		sliderOpen ? "arrow-up" : "arrow-down"
	);

	const handleSlider = () => {
		setSliderOpen(!sliderOpen);
	};

	useLayoutEffect(() => {
		setDivStyle({ height: sliderOpen ? divHeight : "0" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
		const sIcon = sliderOpen ? "arrow-up" : "arrow-down";
		setSliderIcon(sIcon);
	}, [sliderOpen, divHeight]);

	return props => {
		return (
			<section>
				{heading(sliderIcon, handleSlider)}

				<div className="slide-section" style={divStyle}>
					<ExpandComponent
						style={{ background: "inherit", width: "100%", zDepth: zDepth }}
						{...props}
					/>
				</div>
			</section>
		);
	};
};

export default useExpansion;
