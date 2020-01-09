/* CandidateBio.js */
import React from "react";
import Paper from "styledComponents/Paper";
import { createDate } from "assets/js/library.js";

// const dispHorLine = (style = { backgroundColor: "#999" }) => {
// 	return (
// 		<div className="tsd-hdiv" style={{ ...style }}>
// 			{" "}
// 		</div>
// 	);
// };

const dispCandHeader = c => {
	return (
		<React.Fragment>
			<div className="red-bar"></div>
			<div className="grey-bar"></div>
			<div id="resume-header-container">
				<span id="resume-header">
					<span id="header-name">{c.person.formattedName}</span>
					<span id="header-title">
						{c.jobTitle ? c.jobTitle : c.experience[0].jobTitle}
					</span>
					{c.certifications
						.filter(c => c.certificateImage)
						.map(cert => {
							return (
								<img
									key={cert.name}
									src={`${window.imgLoc}certs/${cert.certificateImage}`}
									height={70}
									width={70}
									alt={cert.name}
									className="cert-img"
								/>
							);
						})}
				</span>
			</div>
		</React.Fragment>
	);
};

const dispCandHighlights = highlights => {
	return (
		<div className="md-grid" id="pro-summary-container">
			<div className="md-cell--2 left-title">
				Professional
				<br />
				Summary
			</div>
			<div className="md-cell--9">
				<ul className="highlight-list">
					{highlights.map(h => {
						return <li key={h.id}>{h.highlight}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

const dispTechSkills = techSkills => {
	return (
		<div className="md-grid" id="tech-skills-container">
			<div className="md-cell--2 left-title">
				Technical
				<br />
				Skills
			</div>
			<div className="md-cell--9 tech-skills-container">
				<table className="table table-bordered">
					<tbody>
						{Object.keys(techSkills).map(tskill => {
							return (
								<tr key={tskill}>
									<td>{techSkills[tskill].name}</td>
									<td>{techSkills[tskill].skills.join(", ")}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const buildJobLoc = company => {
	const city = company.municipality ? ", " + company.municipality : "";
	const state = company.region ? ", " + company.region : "";
	const country = company.countryCode ? ", " + company.countryCode : "";
	return company.name + city + state + country;
};

const buildJobDates = job => {
	let ret = "",
		endMonth = "";
	if (job.startDate) {
		const start = createDate(job.startDate);
		const startMonth =
			new Intl.DateTimeFormat("en-US", { month: "short" }).format(start) +
			"/" +
			start.getFullYear();

		if (job.endDate) {
			const end = createDate(job.endDate);
			endMonth =
				new Intl.DateTimeFormat("en-US", { month: "short" }).format(end) +
				end.getYear();
		} else {
			endMonth = "Present";
		}
		ret = startMonth + " - " + endMonth;
	}
	return ret;
};

const buildJobEnvironment = job => {
	return job.skills.reduce((str, skill) => {
		str = str ? skill.name : str + ", " + skill.name;
		return str;
	}, "");
};

const displayJob = job => {
	return (
		<React.Fragment key={job.id}>
			<div className="job-title">{job.jobTitle}</div>
			<div className="job-location-dates">
				<span className="job-location">{buildJobLoc(job.company)}</span>
				{job.startDate && (
					<span className="job-dates">{buildJobDates(job)}</span>
				)}
			</div>
			<div className="job-highlight-title">
				Responsibilities &amp; Achievements
			</div>
			<div>
				<ul className="highlight-list">
					{job.highlights.map(jh => {
						return <li key={jh.id}>{jh.highlight}</li>;
					})}
				</ul>
			</div>
			<div className="row job-environment-container">
				<div className="col-md-1 job-environment-title">Environment:</div>
				<div className="col-md-11 environment-list">
					{buildJobEnvironment(job)}
				</div>
			</div>
		</React.Fragment>
	);
};

const dispCandExp = ex => {
	return (
		<div className="md-grid" id="experience-container">
			<div className="md-cell--2 left-title">Experience</div>
			<div className="md-cell--9" id="job-list">
				{ex.map(job => {
					return displayJob(job);
				})}
			</div>
		</div>
	);
};

const displayEducation = ed => {
	return (
		<React.Fragment key={ed.id}>
			<div className="ed-title">{ed.degreeName}</div>
			{ed.schoolName && <div className="ed-school">{ed.schoolName}</div>}
		</React.Fragment>
	);
};

const dispCandEds = eds => {
	return (
		<div className="md-grid" id="education-container">
			<div className="md-cell--2 left-title">
				Education
				<br />
				&amp; Training
			</div>
			<div className="md-cell--9" id="education-list">
				{eds.map(ed => {
					return displayEducation(ed);
				})}
			</div>
		</div>
	);
};

const dispCandCerts = certs => {
	return (
		<div className="md-grid" id="certification-container">
			<div className="md-cell--2 left-title">Certifications</div>
			<div className="md-cell--9" id="certifications-list">
				<ul>
					{certs.map(cert => {
						return <li key={cert.id}>{cert.name}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

const CandidateBio = ({ candidate, techtagSkills, layout }) => {
	const buildResume = () => {
		return layout.sections.map(s => {
			switch (s.name) {
				case "hd":
					return (
						<React.Fragment key={s.name}>
							{dispCandHeader(candidate)}
						</React.Fragment>
					);
				case "hi":
					return (
						<React.Fragment key={s.name}>
							{// candidate highlights
							dispCandHighlights(candidate.candidateHighlights)}
						</React.Fragment>
					);
				case "ts":
					return (
						<React.Fragment key={s.name}>
							{// technical skills
							dispTechSkills(techtagSkills)}
						</React.Fragment>
					);
				case "ex":
					return (
						<React.Fragment key={s.name}>
							{// Experience
							dispCandExp(candidate.experience)}
						</React.Fragment>
					);
				case "ed":
					return (
						<React.Fragment key={s.name}>
							{// Education & Training
							candidate.education.length > 0 &&
								dispCandEds(candidate.education)}
						</React.Fragment>
					);
				case "ct":
					return (
						<React.Fragment key={s.name}>
							{// Certifications
							candidate.certifications.length > 0 &&
								dispCandCerts(candidate.certifications)}
						</React.Fragment>
					);
				default:
					return <div></div>;
			}
		});
	};

	return <Paper className="full-resume">{candidate.id && buildResume()}</Paper>;
};

export default CandidateBio;
