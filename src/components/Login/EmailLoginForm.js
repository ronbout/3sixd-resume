import React from "react";
import TextField from "styledComponents/TextField";
import Button from "styledComponents/Button";

const EmailLoginForm = props => {
	return (
		<div className="email-login login-section">
			<h4>Sign In by Email</h4>
			<div className="email-login-form">
				<div className="tsd-form-row">
					<TextField
						id="login-email"
						name="email"
						label="Email"
						value={props.state.email}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={props.handleKeyPress}
						onBlur={props.handleEmailBlur}
						required
						error={props.state.emailErr}
						errorText="Invalid Email"
					/>
				</div>

				<div className="tsd-form-row">
					<TextField
						type="password"
						id="login-password"
						name="password"
						label="Password"
						value={props.state.password}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={props.handleKeyPress}
						autoComplete="new-password"
					/>
				</div>
			</div>

			<Button
				type="button"
				variant="raised"
				onClick={props.handleSubmit}
				className="btn btn-primary"
				disabled={!props.state.email || !props.state.password}
			>
				Login with Email
			</Button>
		</div>
	);
};

export default EmailLoginForm;
