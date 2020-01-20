import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserProvider";

import "../../css/nav.css";

const Navmenu = () => {
	const authValue = React.useContext(UserContext);
	return (
		<nav className="navbar nav">
			{authValue.userInfo && !authValue.userInfo.candidateId && (
				<ul>
					<li>
						<NavLink to="/skill/setup" className="nav-link">
							Skills
						</NavLink>
					</li>
					<li>
						<NavLink to="/company/setup" className="nav-link">
							Company
						</NavLink>
					</li>
					<li>
						<NavLink to="/person/setup" className="nav-link">
							Person
						</NavLink>
					</li>
					<li>
						<NavLink to="/candidate-list" className="nav-link">
							Candidates
						</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navmenu;
