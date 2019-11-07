/* KebabMenu.js */
import React from "react";
import { MenuButtonColumn } from "styledComponents/DataTables";
import { FontIcon } from "styledComponents/FontIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuItems = (ndx, onMenuClick) => {
	return [
		/*
		{
			leftIcon: <FontIcon secondary>edit</FontIcon>,
			primaryText: "Edit",
			onClick: () => onMenuClick("edit", ndx)
		},
		*/
		{
			leftIcon: <FontIcon secondary>arrow_upward</FontIcon>,
			primaryText: "Move Up",
			onClick: () => onMenuClick("moveUp", ndx)
		},
		{
			leftIcon: <FontIcon secondary>arrow_downward</FontIcon>,
			primaryText: "Move Down",
			onClick: () => onMenuClick("moveDown", ndx)
		},
		{
			leftIcon: (
				<FontAwesomeIcon
					style={{ color: "#651fff" }}
					size="lg"
					fixedWidth
					icon="cogs"
				/>
			),
			primaryText: "Skills",
			onClick: () => onMenuClick("skills", ndx)
		},
		{ divider: true },
		{
			leftIcon: <FontIcon className="md-text--error">delete</FontIcon>,
			primaryText: <span className="md-text--error">Delete</span>,
			onClick: () => onMenuClick("delete", ndx)
		}
	];
};

const KebabMenu = ({ ndx, onMenuClick, ...props }) => {
	return (
		<MenuButtonColumn
			{...props}
			icon
			menuItems={menuItems(ndx, onMenuClick)}
			listClassName="tables__with-menus__kebab-list"
		>
			<FontIcon primary>more_vert</FontIcon>
		</MenuButtonColumn>
	);
};

export default KebabMenu;
