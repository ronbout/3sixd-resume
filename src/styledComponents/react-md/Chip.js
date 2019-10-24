import React from "react";
import { Chip as MdChip } from "react-md";

const Chip = ({ label, removable = false }) => {
	return <MdChip label={label} removable={removable} />;
};

export default Chip;
