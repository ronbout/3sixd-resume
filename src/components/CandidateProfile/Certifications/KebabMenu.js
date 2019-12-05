/* KebabMenu.js */
import React from "react";
import { MenuButtonColumn } from "styledComponents/DataTables";
import { FontIcon } from "styledComponents/FontIcon";
//import { SVGIcon, fileDownloadIcon } from "styledComponents/SVGIcon";

const menuItems = (ndx, actions) => {
	return [
		{
			leftIcon: <FontIcon secondary>edit</FontIcon>,
			primaryText: "Edit",
			onClick: () => actions.edit(ndx)
		},
		{
			leftIcon: <FontIcon secondary>image</FontIcon>,
			primaryText: "View image",
			onClick: () => actions.image(ndx)
		},

		{ divider: true },
		{
			leftIcon: <FontIcon className="md-text--error">delete</FontIcon>,
			primaryText: <span className="md-text--error">Delete</span>,
			onClick: () => actions.delete(ndx)
		}
	];
};

const KebabMenu = ({ ndx, actions, ...props }) => {
	return (
		<MenuButtonColumn
			{...props}
			icon
			menuItems={menuItems(ndx, actions)}
			listClassName="tables__with-menus__kebab-list"
		>
			<FontIcon primary>more_vert</FontIcon>
		</MenuButtonColumn>
	);
};

export default KebabMenu;
