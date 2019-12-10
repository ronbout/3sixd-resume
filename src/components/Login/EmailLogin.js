import React, { Component } from "react";
import EmailLoginForm from "./EmailLoginForm";
import { isEmail } from "../../assets/js/library";

class EmailLogin extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "", emailErr: false };
	}

	handleKeyPress = event => {
		if (event.key === "Enter") {
			event && event.preventDefault();
			this.handleSubmit();
		}
	};

	handleEmailBlur = () => {
		const emailValid = isEmail(this.state.email);
		this.setState({ emailErr: !emailValid });
	};

	handleSubmit = event => {
		event && event.preventDefault();
		const emailValid = isEmail(this.state.email);
		if (emailValid) {
			this.props.handleLogin(this.state.email, this.state.password);
		} else {
			this.setState({ emailErr: true });
		}
	};

	handleInputChange = event => {
		const target = event.target;
		let errs = {};
		if (target.name === "email" && isEmail(target.value)) {
			errs = { ...errs, emailErr: false };
		}
		this.setState({
			[target.name]: target.value,
			...errs
		});
	};

	render() {
		return (
			<EmailLoginForm
				state={this.state}
				handleInputChange={this.handleInputChange}
				handleKeyPress={this.handleKeyPress}
				handleSubmit={this.handleSubmit}
				handleEmailBlur={this.handleEmailBlur}
			/>
		);
	}
}

export default EmailLogin;
