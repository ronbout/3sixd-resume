/* AdminRoute.js */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "./UserProvider";

const AdminRoute = ({ component: Component, path, ...rest }) => {
	const authValue = React.useContext(UserContext);
	// because github login will take us completely out of the program, set
	// a session variable for the page referrer, that can be used after login
	const stripPath =
		path.slice(-8) === "/:candId" ? path.substring(0, path.length - 8) : path;
	if (!authValue.userInfo) {
		console.log("path: ", stripPath);
		sessionStorage.setItem("referrer", stripPath);
	}
	const userInfo = authValue.userInfo;
	return (
		<Route
			path={path}
			{...rest}
			render={props =>
				userInfo !== false &&
				userInfo.securityLevel &&
				userInfo.securityLevel > 1 ? (
					<Component {...props} />
				) : userInfo !== false ? (
					<Redirect to="/" />
				) : (
					<Redirect to={`/signin?referrer=${stripPath}`} />
				)
			}
		/>
	);
};

export default AdminRoute;
