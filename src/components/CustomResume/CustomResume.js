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
	marginRight: "160px"
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
	const [includeOnlySkills, setIncludeOnlySkills] = useState(true);

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
			includeOnlySkills
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
							<SwitchBase
								id="includeListedSkills"
								name="includeOnlySkills"
								checked={includeOnlySkills}
								label="Include Only Listed Skills (and related) in Technical Skills (techtags)"
								onChange={v => {
									setIncludeOnlySkills(v);
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
