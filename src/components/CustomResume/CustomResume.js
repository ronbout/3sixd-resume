import React, { useEffect, useState } from "react";
import TextField from "styledComponents/TextField";
import SwitchBase from "styledComponents/SwitchBase";
import Button from "styledComponents/Button";
import { buildCustomResumeJson } from "./buildCustomResumeJson";
import { isEmptyObject } from "assets/js/library";

import "./css/customResume.css";

const numWidthStyle = {
	maxWidth: "240px",
	minWidth: "240px",
	marginRight: "100px"
};

const defaultLayout = {
	sections: [
		{ name: "hd" }, // header info
		{ name: "ob" }, // Objective,
		{ name: "ps" }, // Professional Summary
		{ name: "ts" }, // Tech skills
		{ name: "hi" }, // Highlights
		{ name: "ex" }, // Experience
		{ name: "ed" }, // Education
		{ name: "ct" } // Certifications
	]
};

const defaultMaxEntries = {
	highlights: 5,
	jobs: 8,
	jobHighlights: 4,
	education: 2,
	certifications: 2
};

const defaultIncludeOnlySkills = {
	highlights: false,
	jobs: false,
	jobHighlights: false,
	education: false,
	certifications: false,
	techtags: false
};

const CustomResume = ({ candidate, techtagSkills }) => {
	const [skills, setSkills] = useState("");
	const [maxEntries, setMaxEntries] = useState(defaultMaxEntries);
	const [includeOnlySkills, setIncludeOnlySkills] = useState(
		defaultIncludeOnlySkills
	);
	const [includeObjective, setIncludeObjective] = useState(false);
	const [includeProfSummary, setIncludeProfSummary] = useState(false);

	useEffect(() => {
		console.log("candidate: ", candidate);
		console.log("techtagSkills: ", techtagSkills);
	}, [candidate, techtagSkills]);

	const handleCustomize = () => {
		// setSkillsArray(skills.trim().split(","));
		const resumeSettings = {
			skills,
			maxEntries,
			includeOnlySkills,
			includeObjective,
			includeProfSummary
		};
		const resumeJson = buildCustomResumeJson(
			defaultLayout,
			candidate,
			techtagSkills,
			resumeSettings
		);
		console.log("resumeJson: ", resumeJson);
		const layoutUri = encodeURIComponent(JSON.stringify(resumeJson));
		window.open(
			`${window.resumeUrl}?id=${candidate.id}&layout=${layoutUri}`,
			"_blank"
		);
	};

	return (
		<div className="container">
			<div className="center">
				<h1>Customized Resume Creation</h1>
			</div>
			{isEmptyObject(techtagSkills) && !candidate.id ? (
				<p className="center">...loading Candidate Info</p>
			) : (
				<div>
					<div className="parameters">
						<div className="tsd-form-row">
							<TextField
								id="skills"
								name="skills"
								label="Skills (comma-separated list)"
								value={skills}
								onChange={s => setSkills(s)}
								autoFocus
							/>
						</div>
						<div className="tsd-form-row">
							<SwitchBase
								id="includeObjective"
								name="includeObjective"
								checked={includeObjective}
								label="Include Objective"
								onChange={obj => setIncludeObjective(obj)}
							/>
							<SwitchBase
								id="includeProfSummary"
								name="includeProfSummary"
								checked={includeProfSummary}
								label="Include Professional Summary"
								onChange={summ => setIncludeProfSummary(summ)}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxHighlights"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxHighlights"
								label="Max # of Highlights"
								value={maxEntries.highlights}
								onChange={highlights =>
									setMaxEntries(prev => {
										return {
											...prev,
											highlights
										};
									})
								}
							/>
							<SwitchBase
								id="includeOnlySkillsHighlights"
								name="includeOnlySkillsHighlights"
								checked={includeOnlySkills.highlights}
								label="Only Highlights with Listed Skills"
								onChange={highlights =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											highlights
										};
									})
								}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxJobs"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxJobs"
								label="Max # of Jobs"
								value={maxEntries.jobs}
								onChange={jobs =>
									setMaxEntries(prev => {
										return {
											...prev,
											jobs
										};
									})
								}
							/>
							<SwitchBase
								id="includeOnlySkillsJobs"
								name="includeOnlySkillsJobs"
								checked={includeOnlySkills.jobs}
								label="Only Jobs with Listed Skills"
								onChange={jobs =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											jobs
										};
									})
								}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxJobHi"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxJobHi"
								label="Max # of Job Highlights"
								value={maxEntries.jobHighlights}
								onChange={jobHighlights =>
									setMaxEntries(prev => {
										return {
											...prev,
											jobHighlights
										};
									})
								}
							/>
							<SwitchBase
								id="includeOnlySkillsJobHighlights"
								name="includeOnlySkillsJobHighlights"
								checked={includeOnlySkills.jobHighlights}
								label="Only Job Highlights with Listed Skills"
								onChange={jobHighlights =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											jobHighlights
										};
									})
								}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxEds"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxEds"
								label="Max # of Education Items"
								value={maxEntries.education}
								onChange={education =>
									setMaxEntries(prev => {
										return {
											...prev,
											education
										};
									})
								}
							/>
							<SwitchBase
								id="includeOnlySkillsEds"
								name="includeOnlySkillsEds"
								checked={includeOnlySkills.education}
								label="Only Education with Listed Skills"
								onChange={education =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											education
										};
									})
								}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxCerts"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxCerts"
								label="Max # of Certifications"
								value={maxEntries.certifications}
								onChange={certifications =>
									setMaxEntries(prev => {
										return {
											...prev,
											certifications
										};
									})
								}
							/>
							<SwitchBase
								id="includeOnlySkillsCerts"
								name="includeOnlySkillsCerts"
								checked={includeOnlySkills.certifications}
								label="Only Certifications with Listed Skills"
								onChange={certifications =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											certifications
										};
									})
								}
							/>
						</div>
						<div className="tsd-form-row">
							<SwitchBase
								id="includeListedSkills"
								name="includeOnlySkills"
								checked={includeOnlySkills.techtags}
								label="Only Technical Skills (techtags) with Listed Skills"
								onChange={techtags =>
									setIncludeOnlySkills(prev => {
										return {
											...prev,
											techtags
										};
									})
								}
							/>
						</div>
						<div>
							<Button
								type="button"
								variant="raised"
								className="btn btn-info"
								onClick={handleCustomize}
							>
								View Resume
							</Button>
						</div>
					</div>
					<div className="results">
						<h3>Results</h3>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomResume;
