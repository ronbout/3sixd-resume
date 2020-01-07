/* PersonalInfo.js */
import React from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { isEqual } from "lodash";

const PersonalInfoDiv = ({ person, candId, compObj, handleUpdate }) => {
	const handleSubmit = personObj => {
		handleUpdate({ person: personObj });
	};

	return (
		<section>
			<div className="pi-content">
				<PersonalInfoDisp
					formattedName={person.formattedName}
					candId={candId}
					pct={compObj.totPct}
				/>
				<div id="pi-divider" className="tsd-vdiv" />
				<PersonalInfoForm person={person} handleSubmit={handleSubmit} />
			</div>
		</section>
	);
};

const PersonalInfo = ({ person, candId, compObj, handleUpdate }) => {
	React.useEffect(() => {
		console.log("***  PersonalInfo rendered ***");
	});

	const header = () => {
		return <ProfileSectionHeader headerTitle="Personal Info" />;
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
			<ExpandProfileInfo
				person={person}
				candId={candId}
				compObj={compObj}
				handleUpdate={handleUpdate}
			/>
		</section>
	);
};

export default React.memo(PersonalInfo, (prev, next) =>
	isEqual(prev.person, next.person)
);
