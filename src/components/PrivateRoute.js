import React from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "./UserProvider";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const authValue = React.useContext(UserContext);
  // because github login will take us completely out of the program, set
  // a session variable for the page referrer, that can be used after login
  const stripPath = path === "/profile/:candId" ? "/profile" : path;
  if (!authValue.userInfo) {
    console.log("path: ", stripPath);
    sessionStorage.setItem("referrer", stripPath);
  }
  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        authValue.userInfo !== false ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/signin?referrer=${stripPath}`} />
        )
      }
    />
  );
};

export default PrivateRoute;
