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
		{ name: "ts" }, // Tech skills
		{ name: "hi" }, // Highlights
		{ name: "ex" }, // Experience
		{ name: "ed" }, // Education
		{ name: "ct" } // Certifications
	]
};

const CustomResume = ({ candidate, techtagSkills }) => {
	const [skills, setSkills] = useState("");
	const [maxHi, setMaxHi] = useState(5);
	const [maxJobs, setMaxJobs] = useState(4);
	const [maxJobHi, setMaxJobHi] = useState(4);
	const [maxEds, setMaxEds] = useState(2);
	const [maxCerts, setMaxCerts] = useState(2);
	const [includeOnlySkillsTechtags, setIncludeOnlySkillsTechtags] = useState(
		true
	);
	const [includeOnlySkillsJobs, setIncludeOnlySkillsJobs] = useState(false);
	const [includeOnlySkillsEds, setIncludeOnlySkillsEds] = useState(false);
	const [includeOnlySkillsCerts, setIncludeOnlySkillsCerts] = useState(false);

	useEffect(() => {
		console.log("candidate: ", candidate);
		console.log("techtagSkills: ", techtagSkills);
	}, [candidate, techtagSkills]);

	const handleCustomize = () => {
		// setSkillsArray(skills.trim().split(","));
		const resumeSettings = {
			skills,
			maxHi,
			maxJobs,
			maxJobHi,
			maxEds,
			maxCerts,
			includeOnlySkillsTechtags,
			includeOnlySkillsJobs,
			includeOnlySkillsEds,
			includeOnlySkillsCerts
		};
		const resumeJson = buildCustomResumeJson(
			defaultLayout,
			candidate,
			techtagSkills,
			resumeSettings
		);
		console.log("resumeJson: ", resumeJson);
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
							<TextField
								id="maxHighlights"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxHighlights"
								label="Max # of Highlights"
								value={maxHi}
								onChange={v => setMaxHi(v)}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxJobs"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxJobs"
								label="Max # of Jobs"
								value={maxJobs}
								onChange={v => setMaxJobs(v)}
							/>
							<SwitchBase
								id="includeListedSkillsJobs"
								name="includeOnlySkillsJobs"
								checked={includeOnlySkillsJobs}
								label="Only Jobs with Listed Skills"
								onChange={v => {
									setIncludeOnlySkillsJobs(v);
								}}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxJobHi"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxJobHi"
								label="Max # of Job Highlights"
								value={maxJobHi}
								onChange={v => setMaxJobHi(v)}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxEds"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxEds"
								label="Max # of Education Items"
								value={maxEds}
								onChange={v => setMaxEds(v)}
							/>
							<SwitchBase
								id="includeOnlySkillsEds"
								name="includeOnlySkillsEds"
								checked={includeOnlySkillsEds}
								label="Only Education with Listed Skills"
								onChange={v => {
									setIncludeOnlySkillsEds(v);
								}}
							/>
						</div>
						<div className="tsd-form-row">
							<TextField
								id="maxCerts"
								type="number"
								style={{ ...numWidthStyle }}
								name="maxCerts"
								label="Max # of Certifications"
								value={maxCerts}
								onChange={v => setMaxCerts(v)}
							/>
							<SwitchBase
								id="includeOnlySkillsCerts"
								name="includeOnlySkillsCerts"
								checked={includeOnlySkillsCerts}
								label="Only Certifications with Listed Skills"
								onChange={v => {
									setIncludeOnlySkillsCerts(v);
								}}
							/>
						</div>
						<div className="tsd-form-row">
							<SwitchBase
								id="includeListedSkills"
								name="includeOnlySkills"
								checked={includeOnlySkillsTechtags}
								label="Only Technical Skills (techtags) with Listed Skills"
								onChange={v => {
									setIncludeOnlySkillsTechtags(v);
								}}
							/>
						</div>
						<div>
							<Button
								type="button"
								variant="raised"
								className="btn btn-info"
								onClick={handleCustomize}
							>
								Customize Resume
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
