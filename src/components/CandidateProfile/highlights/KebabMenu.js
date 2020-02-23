/* KebabMenu.js */
import React from "react";
import { MenuButtonColumn } from "styledComponents/DataTables";
import { FontIcon } from "styledComponents/FontIcon";

const menuItems = (ndx, onMenuClick, dataCount) => {
	return [
		{
			leftIcon: <FontIcon secondary>arrow_upward</FontIcon>,
			primaryText: "Move Up",
			onClick: () => onMenuClick("moveUp", ndx),
			disabled: ndx === 0
		},
		{
			leftIcon: <FontIcon secondary>arrow_downward</FontIcon>,
			primaryText: "Move Down",
			onClick: () => onMenuClick("moveDown", ndx),
			disabled: ndx === dataCount - 1
		}
	];
};

const KebabMenu = ({ ndx, dataCount, onMenuClick, ...props }) => {
	return (
		<MenuButtonColumn
			{...props}
			icon
			menuItems={menuItems(ndx, onMenuClick, dataCount)}
			listClassName="tables__with-menus__kebab-list"
		>
			<FontIcon primary>more_vert</FontIcon>
		</MenuButtonColumn>
	);
};

export default KebabMenu;
