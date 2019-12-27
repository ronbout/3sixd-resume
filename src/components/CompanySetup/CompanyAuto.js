/* CompanyAuto.js */
/* autocomplete component for company name */
import React, { useState, useEffect } from "react";
import Autocomplete from "styledComponents/Autocomplete";
import dataFetch from "assets/js/dataFetch";

const API_COMPANY_SEARCH = "companies/search";

const CompanyAuto = ({
	company,
	handleOnChange,
	handleCompanySelect,
	...rest
}) => {
	const [results, setResults] = useState([]);
	const [autoResults, setAutoResults] = useState([]);
	const isMounted = React.useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	});

	useEffect(() => {
		handleSearch(company);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [company]);

	const handleSearch = async searchVal => {
		const apiQuery = `&name=${searchVal}`;

		let results = await dataFetch(API_COMPANY_SEARCH, apiQuery);
		if (results.error) {
			console.log("Fetch error: ", results);
		} else {
			const data = results.map(r => {
				return r.name;
			});
			if (isMounted.current) {
				setResults(results ? results : []);
				setAutoResults(data ? data : []);
			}
		}
	};
	const handleChange = (val, e) => {
		handleOnChange(val);
		//handleSearch(val);
	};

	const handleSelect = (val, valNdx, matches) => {
		handleCompanySelect(results[valNdx]);
	};

	return (
		<div className="input-div">
			<Autocomplete
				id="company"
				label="Name *"
				data={autoResults}
				value={company}
				onChange={handleChange}
				onAutocomplete={handleSelect}
				filter={null}
				{...rest}
			/>
		</div>
	);
};

export default CompanyAuto;
