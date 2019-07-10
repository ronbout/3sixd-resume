import React from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../UserProvider";

import "../../css/nav.css";

function NavSignin() {
  const authValue = React.useContext(UserContext);
  console.log("userInfo: ", authValue);
  return (
    <nav className="signin nav">
      {authValue.userInfo === false ? (
        <ul>
          <li>
            <NavLink to="/signin" className="nav-link">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink
              to={"/profile/" + authValue.userInfo.candidateId}
              className="nav-link"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button id="signin-button" onClick={() => authValue.handleLogout()}>
              Sign Out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavSignin;
