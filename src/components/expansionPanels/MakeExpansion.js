/* MakeExpansion */
import React, { useState, useLayoutEffect } from "react";
import { FontIcon } from "styledComponents/FontIcon";
import "./css/expansionPanels.css";

/**
 * replacement for the react-md expansion panels
 * This version will NOT unmount when not displayed.
 */

const MakeExpansion = (
	ExpandComponent,
	heading,
	footer = null,
	defaultExpanded = false,
	zDepth = 1,
	divHeight = "600px"
) => {
	const sectionHeader = (headerTitle, handleSlider, sliderIcon = "") => {
		return (
			<div
				role="button"
				className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-panel-header md-panel-header--expanded"
				tabIndex="0"
				aria-pressed="true"
				onClick={handleSlider}
			>
				<span>
					<h2>{headerTitle || "Section Header"}</h2>
				</span>

				{sliderIcon && (
					<span className="slider-arrow">
						<FontIcon>{sliderIcon}</FontIcon>
					</span>
				)}
			</div>
		);
	};
	const Slider = props => {
		const [sliderOpen, setSliderOpen] = useState(defaultExpanded);
		const [divStyle, setDivStyle] = useState({ display: "none" });
		const [sliderIcon, setSliderIcon] = useState(
			sliderOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"
		);

		const handleSlider = () => {
			setSliderOpen(!sliderOpen);
		};

		useLayoutEffect(() => {
			setDivStyle({ height: sliderOpen ? divHeight : "0" });
			// eslint-disable-next-line react-hooks/exhaustive-deps
			const sIcon = sliderOpen ? "keyboard_arrow_up" : "keyboard_arrow_down";
			setSliderIcon(sIcon);
		}, [sliderOpen]);
		return (
			<li
				aria-expanded="true"
				className="md-paper md-paper--0 md-expansion-panel md-expansion-panel--expanded"
				style={{ background: "inherit", width: "100%" }}
			>
				{sectionHeader(heading, handleSlider, sliderIcon)}

				<div className="slide-section" style={divStyle}>
					<ExpandComponent
						style={{ background: "inherit", width: "100%", zDepth: zDepth }}
						{...props}
					/>
				</div>
			</li>
		);
	};
	return Slider;
};

export default MakeExpansion;
