import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

/**
 * This is used to receive the callback from the github
 * single click login.  We need to check the oauthType
 * Session var to see whether we need to redirect to
 * the Login Or Signup component after getting the user
 * email from Github.
 * It receives a query string with the access token from the server side
 * program.  If no query string, just redirect to home
 */

const API_URL_USER = "https://api.github.com/user";
const API_URL_EMAIL = "https://api.github.com/user/emails";

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

const GithubCallback = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const oauthType = sessionStorage.getItem("oauthType");

	useEffect(() => {
		if (!token) return <Redirect to="/" />;
		const apiUrlUser = `${API_URL_USER}?access_token=${token}`;
		const apiUrlEmail = `${API_URL_EMAIL}?access_token=${token}`;
		const userFetch = fetch(apiUrlUser).then(response => {
			return response.json();
		});

		const emailFetch = fetch(apiUrlEmail).then(response => {
			return response.json();
		});

		Promise.all([userFetch, emailFetch])
			.then(results => {
				setName(results[0].name);
				setEmail(results[1][0].email);
			})
			.catch(err => console.log("error fetching github data: ", err));
	}, []);

	if (oauthType === "register" && email !== "" && name !== "")
		return <Redirect to={`/register?email=${email}&name=${name}`} />;
	if (oauthType === "login" && email !== "")
		return <Redirect to={`/signin?email=${email}`} />;
	return (
		<div>
			<h3>Waiting on github oauth process.</h3>
		</div>
	);
};

export default GithubCallback;
