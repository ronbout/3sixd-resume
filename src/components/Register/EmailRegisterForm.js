import React from "react";
import TextField from "styledComponents/TextField";
import Button from "styledComponents/Button";

const EmailRegisterForm = props => {
	return (
		<div className="email-register register-section">
			<h4>Register by Email</h4>
			<div className="email-register-form">
				<div className="tsd-form-row">
					<TextField
						id="register-name"
						name="name"
						label="Name"
						value={props.state.formFields.name}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={props.handleKeyPress}
						autoFocus
						required
					/>
				</div>
				<div className="tsd-form-row">
					<TextField
						id="register-email"
						name="email"
						label="Email"
						value={props.state.formFields.email}
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
						id="register-password"
						name="password"
						label="Password"
						value={props.state.formFields.password}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={props.handleKeyPress}
						autoComplete="new-password"
						error={props.state.passErr}
						errorText="Passwords are required and must match"
					/>
				</div>
				<div className="tsd-form-row">
					<TextField
						type="password"
						id="register-password2"
						name="password2"
						label="Confirm Password"
						value={props.state.formFields.password2}
						onChange={(val, e) => props.handleInputChange(e)}
						onKeyPress={props.handleKeyPress}
						autoComplete="new-password"
						error={props.state.passErr}
						errorText="Passwords are required and must match"
					/>
				</div>
			</div>
			<Button
				type="button"
				variant="raised"
				onClick={props.handleSubmit}
				className="btn btn-primary"
				disabled={
					!props.state.formFields.name ||
					!props.state.formFields.email ||
					!props.state.formFields.password ||
					!props.state.formFields.password2 ||
					props.state.passErr ||
					props.state.emailErr
				}
			>
				Register with Email
			</Button>
		</div>
	);
};

export default EmailRegisterForm;
