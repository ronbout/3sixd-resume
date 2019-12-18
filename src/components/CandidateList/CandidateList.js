/* CandidateList.js */
import React from "react";
import { Card, CardText } from "styledComponents/Card";
import Button from "styledComponents/Button";
import { Link } from "react-router-dom";

const CandidateList = ({ candidates }) => {
	return (
		<div>
			<ul>
				{candidates.map(c => {
					const headerRow = (
						<div
							className="clist-header1"
							style={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%"
							}}
						>
							<div className="ccard-left">{c.personFormattedName}</div>
							<div className="ccard-right">Located In</div>
						</div>
					);

					const headerRow2 = (
						<div
							className="clist-header2"
							style={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%"
							}}
						>
							<div className="ccard-left">{c.jobTitle ? c.jobTitle : ""}</div>
							<div className="ccard-right">
								{c.personMunicipality ? c.personMunicipality : "N / A"}
							</div>
						</div>
					);

					const btnRow = (
						<div
							className="clist-btns"
							style={{
								marginTop: "8px",
								display: "flex",
								justifyContent: "space-between",
								width: "100%"
							}}
						>
							<div className="ccard-left">
								<Link to={`/profile/${c.id}`}>
									<Button variant="flat">Edit Profile -></Button>
								</Link>
							</div>
							<div className="ccard-right">
								<Link to={`/bio/${c.id}`}>
									<Button variant="flat">View Bio -></Button>
								</Link>
							</div>
						</div>
					);
					return (
						<li key={c.id}>
							<div>
								<Card>
									<CardText>
										{headerRow}
										{headerRow2}
										<div className="skill-list">
											<span style={{ fontWeight: "bold" }}>Skills - </span>
											{c.skillList}
										</div>
										{btnRow}
									</CardText>
								</Card>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CandidateList;
