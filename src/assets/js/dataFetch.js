/**
 * dataFetch is a generic fetch function that uses async await
 * and will clean up the fetch routines so that all have a standard
 * code.  It will use try/catch for error handling.
 */
import { convertNullsToEmpty } from "./library.js";

const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";
const API_COMPANY = "companies";
const API_PERSON = "persons";

export default async function dataFetch(
	endpoint,
	queryStr = "",
	httpMethod = "GET",
	body = null,
	formData = false,
	urlBase = window.apiUrl,
	wpFlag = false, // the resume api's return a data object when successful.  wp does not
	wpNonce = ""
) {
	const apiQuery = !wpFlag ? API_QUERY : queryStr ? "?" : "";
	let basicUrl = `${urlBase}${endpoint}${apiQuery}${queryStr}`;
	let headers = {};
	headers = {
		headers: {
			"Cache-Control": "no-cache",
		},
	};
	headers = formData
		? headers
		: { headers: { ...headers.headers, "Content-Type": "application/json" } };

	if (wpFlag) {
		let wpHeaders = wpNonce
			? {
					"X-WP-Nonce": wpNonce,
			  }
			: {
					Authorization: `Basic ${window.btoa(
						"Ronbout:xid4oN&@g4y9wTAul&Kfirs8"
					)}`,
			  };
		headers = {
			headers: {
				...headers.headers,
				...wpHeaders,
			},
		};
	}

	console.log(headers);
	let httpConfig = body
		? {
				method: httpMethod,
				body: formData ? body : JSON.stringify(body),
				...headers,
		  }
		: { ...headers };

	try {
		const response = await fetch(basicUrl, httpConfig);
		let result = await response.json();
		if (result.error) {
			return result;
		} else {
			const resultData = !wpFlag ? result.data : result;
			result = convertNullsToEmpty(resultData);
			return result;
		}
	} catch (error) {
		console.log("Fetch error: ", error);
		return { error: error };
	}
}

export async function fetchCompany(id) {
	const endpoint = `${API_COMPANY}/${id}`;
	const company = await dataFetch(endpoint);
	return company;
}

export async function fetchPerson(id) {
	const endpoint = `${API_PERSON}/${id}`;
	const person = await dataFetch(endpoint);
	return person;
}
