import React from "react";
import SocialRegister from "./SocialRegister";
import EmailRegister from "./EmailRegister";
import { NavLink } from "react-router-dom";

import "./css/register.css";

const Register = props => {
	return (
		<div className="container-fluid">
			{props.errMsg && <div className="register-error">{props.errMsg}</div>}
			{props.confirmMsg ? (
				<div className="register-confirm">{props.confirmMsg}</div>
			) : (
				<React.Fragment>
					<div className="register-container">
						<SocialRegister handleRegister={props.handleRegister} />
						<div className="vert-divider" />
						<div className="horiz-divider" />
						<EmailRegister handleRegister={props.handleRegister} />
					</div>{" "}
					<div className="register-msg">
						<span>Already registered?</span>
						<NavLink to="/signin" className="nav-link">
							Sign In
						</NavLink>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Register;
