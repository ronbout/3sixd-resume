import React from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";

const PersonalInfoDiv = ({ person, candId, compObj }) => {
	// const handleSubmit = personObj => {
	// 	//handleUpdate({ person: personObj });
	// };

	return (
		<section>
			<div className="pi-content">
				<PersonalInfoDisp
					formattedName={person.formattedName}
					candId={candId}
					pct={compObj.totPct}
				/>
				<div id="pi-divider" className="tsd-vdiv" />
				<PersonalInfoForm person={person} />
			</div>
		</section>
	);
};

const PersonalInfo = ({ person, candId, compObj }) => {
	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Personal Info"
				profilePercentage={
					compObj.person.curPct + " / " + compObj.person.availPct
				}
				profileSectionCompleted={
					compObj.person.curPct === compObj.person.availPct
				}
			/>
		);
	};

	const ExpandProfileInfo = makeExpansion(
		PersonalInfoDiv,
		header,
		null,
		true,
		0
	);

	return (
		<section className="personal-info profile-section">
			<ExpandProfileInfo person={person} candId={candId} compObj={compObj} />
		</section>
	);
};

export default PersonalInfo;
