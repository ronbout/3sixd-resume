import React from "react";
import { NavLink } from "react-router-dom";

import "../../css/nav.css";

const Navmenu = () => {
	return (
		<nav className="navbar nav">
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
		</nav>
	);
};

export default Navmenu;
