/* CandidateListFilter.js */
import React, { useState } from "react";
import TextField from "styledComponents/TextField";
import Button from "styledComponents/Button";

const emptyFilters = { name: "", title: "", skills: "" };

const CandidateListFilter = props => {
	const [filters, setFilters] = useState(emptyFilters);

	const handleFilterChange = e => {
		const target = e.target;
		setFilters(prevFilter => {
			return { ...prevFilter, [target.name]: target.value };
		});
	};

	const handleKeyPress = event => {
		if (event.key === "Enter") {
			event && event.preventDefault();
			props.filterList(filters);
		}
	};

	const resetFilters = () => {
		setFilters(emptyFilters);
		props.filterList(emptyFilters);
	};

	return (
		<div>
			<h2>Filter Candidates</h2>
			<div className="clist-filters">
				<TextField
					id="name-filter"
					name="name"
					label="Search by Name"
					value={filters.name}
					onChange={(val, e) => handleFilterChange(e)}
					onKeyPress={handleKeyPress}
				/>
				<TextField
					id="title-filter"
					name="title"
					label="Search by Title"
					value={filters.title}
					onChange={(val, e) => handleFilterChange(e)}
					onKeyPress={handleKeyPress}
				/>
				<TextField
					id="skills-filter"
					name="skills"
					label="Search by Skill(s)"
					value={filters.skills}
					onChange={(val, e) => handleFilterChange(e)}
					onKeyPress={handleKeyPress}
				/>
			</div>
			<Button type="button" onClick={() => props.filterList(filters)}>
				Filter
			</Button>
			<Button
				type="button"
				variant="raised"
				className="btn btn-info"
				onClick={resetFilters}
			>
				Reset Filters
			</Button>
		</div>
	);
};

export default CandidateListFilter;
